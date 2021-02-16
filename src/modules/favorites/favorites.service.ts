import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Favorite } from './entities/favorite.entity';

import { PersonsService } from '../persons/persons.service';
import { ProductsService } from '../products/products.service';

import { CreateFavoriteInput } from './dto/create-favorite.input.dto';
import { UpdateFavoriteInput } from './dto/update-favorite.input.dto';
import { FindAllFavoritesInput } from './dto/find-all-favorites-input.dto';
import { FindOneFavoriteInput } from './dto/find-one-favorite-input.dto';

@Injectable()
export class FavoritesService {
  constructor (
    @InjectRepository(Favorite)
    private readonly FavoriteRepository: Repository<Favorite>,
    private readonly personsService: PersonsService,
    private readonly productsService: ProductsService
  ) {}

  /* CRUD RELATED OPERATIONS */

  async create (createFavoriteInput: CreateFavoriteInput): Promise<Favorite> {
    const { authUid, productId } = createFavoriteInput;

    const person = await this.personsService.findOne({ authUid });

    if (!person) {
      throw new NotFoundException(`can't get the person with authUid ${authUid}.`);
    }

    // TODO: fix
    const product = {};

    const created = this.FavoriteRepository.create({
      ...createFavoriteInput,
      person,
      product
    });

    return await this.FavoriteRepository.save(created);
  }

  async findAll (findAllFavoritesInput: FindAllFavoritesInput): Promise<Favorite[]> {
    return await this.FavoriteRepository.find();
  }

  async findOne (findOneFavoriteInput: FindOneFavoriteInput): Promise<Favorite> {
    const favorite = await this.FavoriteRepository.findOne(findOneFavoriteInput);
    if (!favorite) throw new NotFoundException('No hay un favorito con esa ID');
    return favorite;
  }

  async update (findOneFavoriteInput: FindOneFavoriteInput, updateFavoriteInput: UpdateFavoriteInput): Promise<Favorite> {
    const favorite = await this.findOne(findOneFavoriteInput);

    const { productId, authUid } = updateFavoriteInput;

    // TODO: fix this
    const person = {};
    const product = {};

    const editedFavorite = this.FavoriteRepository.merge(favorite, {
      ...updateFavoriteInput,
      person,
      product
    });
    return await this.FavoriteRepository.save(editedFavorite);
  }

  async remove (findOneFavoriteInput: FindOneFavoriteInput): Promise<Favorite> {
    const favorite = await this.findOne(findOneFavoriteInput);
    return await this.FavoriteRepository.remove(favorite);
  }
}
