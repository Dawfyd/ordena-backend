import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsService } from '../products/products.service';
import { VenuesService } from '../venues/venues.service';
import { ProductsInVenue } from './entities/products-in-venue.entity';

import { CreateProductsInVenueInput } from './dto/create-products-in-venue-input.dto';
import { FindAllProductsInVenueInput } from './dto/find-all-products-in-venue-input.dto';
import { FindOneProductsInVenueInput } from './dto/find-one-products-in-venue-input.dto';

@Injectable()
export class ProductsInVenueService {
  constructor (
    @InjectRepository(ProductsInVenue)
    private readonly productsInVenueRepository: Repository<ProductsInVenue>,
    private readonly venuesService: VenuesService,
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService
  ) {}

  /* CRUD RELATED OPERATIONS */

  public async create (CreateProductsInVenueInput: CreateProductsInVenueInput): Promise<ProductsInVenue> {
    const { companyUuid, venueId, productId } = CreateProductsInVenueInput;

    const venue = await this.venuesService.findOne({ companyUuid, id: venueId });

    if (!venue) {
      throw new NotFoundException(`can't get the venue ${venueId} for the company ${companyUuid}.`);
    }

    const product = await this.productsService.getById({ id: productId });

    if (!product) {
      throw new NotFoundException(`can't get the product ${productId}.`);
    }

    const created = this.productsInVenueRepository.create({
      venue,
      product
    });

    const saved = await this.productsInVenueRepository.save(created);

    return saved;
  }

  public async findAll (findAllProductsInVenueInput: FindAllProductsInVenueInput): Promise<ProductsInVenue[]> {
    const { companyUuid, limit, skip } = findAllProductsInVenueInput;

    const query = this.productsInVenueRepository.createQueryBuilder('pv')
      .loadAllRelationIds()
      .innerJoin('pv.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid });

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('pv.id', 'DESC');

    const items = await query.getMany();

    return items;
  }

  public async findOne (findOneProductsInVenueInput: FindOneProductsInVenueInput): Promise<ProductsInVenue | null> {
    const { companyUuid, id } = findOneProductsInVenueInput;

    const item = await this.productsInVenueRepository.createQueryBuilder('pv')
      .loadAllRelationIds()
      .innerJoin('pv.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('pv.id = :id', { id })
      .getOne();

    return item || null;
  }
}
