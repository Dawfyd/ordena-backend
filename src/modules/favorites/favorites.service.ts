import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Favorite } from './entities/favorite.entity';

import { PersonsService } from '../persons/persons.service';
import { ProductsService } from '../products/products.service';

import { CreateFavoriteInput } from './dto/create-favorite.input.dto';
import { UpdateFavoriteInput } from './dto/update-favorite.input.dto';
import { FindAllFavoritesInput } from './dto/find-all-favorites-input.dto';
import { FindOneFavoriteInput } from './dto/find-one-favorite-input.dto';
import { ParametersService } from '../parameters/parameters.service';
import { ProductTypesService } from '../product-types/product-types.service';

@Injectable()
export class FavoritesService {
  constructor (
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly personsService: PersonsService,
    private readonly productsService: ProductsService,
    private readonly parametersService: ParametersService,
    private readonly productTypesService: ProductTypesService
  ) {}

  /* CRUD RELATED OPERATIONS */

  async create (createFavoriteInput: CreateFavoriteInput): Promise<Favorite> {
    const productTypePure = await this.parametersService.findOneName('PRODUCT_TYPE_PURE');

    if (!productTypePure) {
      throw new PreconditionFailedException('The parameter to identify the code of the product type must exist and be configured correctly "PRODUCT_TYPE_PURE".');
    }

    const { authUid, companyUuid, productId } = createFavoriteInput;

    const person = await this.personsService.findOne({ authUid });

    if (!person) {
      throw new NotFoundException(`can't get the person with authUid ${authUid}.`);
    }

    const product = await this.productsService.findOne({ companyUuid, id: productId });

    if (!product) {
      throw new NotFoundException(`can't get the product ${productId} for the company ${companyUuid}.`);
    }

    const productType = await this.productTypesService.findOne({ id: +product.productType });

    if (productTypePure.value !== productType.code) {
      throw new PreconditionFailedException('only a pure product type can be favorite');
    }

    const created = this.favoriteRepository.create({
      ...createFavoriteInput,
      person,
      product
    });

    const saved = await this.favoriteRepository.save(created);

    return saved;
  }

  async findAll (findAllFavoritesInput: FindAllFavoritesInput): Promise<Favorite[]> {
    const { companyUuid, authUid, limit, skip } = findAllFavoritesInput;

    const query = this.favoriteRepository.createQueryBuilder('f')
      .loadAllRelationIds()
      .innerJoin('f.person', 'pe')
      .innerJoin('f.product', 'p')
      .innerJoin('p.productsInVenues', 'pv')
      .innerJoin('pv.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('pe.authUid = :authUid', { authUid });

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('f.id', 'DESC');

    const items = await query.getMany();

    return items;
  }

  async findOne (findOneFavoriteInput: FindOneFavoriteInput): Promise<Favorite | null> {
    const { companyUuid, authUid, id } = findOneFavoriteInput;

    const item = await this.favoriteRepository.createQueryBuilder('f')
      .loadAllRelationIds()
      .innerJoin('f.person', 'pe')
      .innerJoin('f.product', 'p')
      .innerJoin('p.productsInVenues', 'pv')
      .innerJoin('pv.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('pe.authUid = :authUid', { authUid })
      .andWhere('f.id = :id', { id })
      .getOne();

    return item || null;
  }

  async update (findOneFavoriteInput: FindOneFavoriteInput, updateFavoriteInput: UpdateFavoriteInput): Promise<Favorite> {
    const { companyUuid, authUid, id } = findOneFavoriteInput;

    const existing = await this.findOne(findOneFavoriteInput);

    if (!existing) {
      throw new NotFoundException(`can't get the favorite ${id} for the person with authUid ${authUid} and company with uuid ${companyUuid}.`);
    }

    const preloaded = await this.favoriteRepository.preload({
      id: existing.id,
      ...updateFavoriteInput
    });

    const saved = await this.favoriteRepository.save(preloaded);

    return saved;
  }

  async remove (findOneFavoriteInput: FindOneFavoriteInput): Promise<Favorite> {
    const { companyUuid, authUid, id } = findOneFavoriteInput;

    const existing = await this.findOne(findOneFavoriteInput);

    if (!existing) {
      throw new NotFoundException(`can't get the favorite ${id} for the person with authUid ${authUid} and company with uuid ${companyUuid}.`);
    }

    const clone = { ...existing };

    await this.favoriteRepository.remove(existing);

    return clone;
  }
}
