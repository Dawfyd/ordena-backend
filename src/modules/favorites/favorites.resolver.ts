import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';

import { Person } from '../persons/entities/person.entity';
import { Favorite } from './entities/favorite.entity';
import { Product } from '../products/entities/product.entity';

import { FavoritesService } from './favorites.service';
import { FavoritesLoaders } from './favorites.loaders';

import { CreateFavoriteInput } from './dto/create-favorite.input.dto';
import { UpdateFavoriteInput } from './dto/update-favorite.input.dto';
import { FindAllFavoritesInput } from './dto/find-all-favorites-input.dto';
import { FindOneFavoriteInput } from './dto/find-one-favorite-input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => Favorite)
export class FavoritesResolver {
  constructor (
    private readonly service: FavoritesService,
    private readonly favoritesLoaders: FavoritesLoaders
  ) {}

  @Mutation(() => Favorite, { name: 'createFavorite' })
  create (
    @Args('createFavoriteInput') createFavoriteInput: CreateFavoriteInput): Promise<Favorite> {
    return this.service.create(createFavoriteInput);
  }

  @Query(() => [Favorite], { name: 'favorites' })
  findAll (@Args('findAllFavoritesInput') findAllFavoritesInput: FindAllFavoritesInput): Promise<Favorite[]> {
    return this.service.findAll(findAllFavoritesInput);
  }

  @Query(() => Favorite, { name: 'favorite', nullable: true })
  findOne (@Args('findOneFavoriteInput') findOneFavoriteInput: FindOneFavoriteInput): Promise<Favorite> {
    return this.service.findOne(findOneFavoriteInput);
  }

  @Mutation(() => Favorite, { name: 'updateFavorite' })
  update (
    @Args('findOneFavoriteInput') findOneFavoriteInput: FindOneFavoriteInput,
    @Args('updateFavoriteInput') updateFavoriteInput: UpdateFavoriteInput
  ): Promise<Favorite> {
    return this.service.update(
      findOneFavoriteInput,
      updateFavoriteInput
    );
  }

  @Mutation(() => Favorite, { name: 'removeFavorite' })
  remove (@Args('findOneFavoriteInput') findOneFavoriteInput: FindOneFavoriteInput): Promise<Favorite> {
    return this.service.remove(findOneFavoriteInput);
  }

  @ResolveField(() => Person, { name: 'person' })
  person (@Parent() favorite: Favorite): Promise<Person> {
    const personValue: any = favorite.person;

    let personId = personValue;

    if (typeof personId !== 'number') personId = personValue.id;

    return this.favoritesLoaders.batchPersons.load(personId);
  }

  @ResolveField(() => Product, { name: 'product' })
  product (@Parent() favorite: Favorite): Promise<Product> {
    const productValue: any = favorite.product;

    let productId = productValue;

    if (typeof productId !== 'number') productId = productValue.id;

    return this.favoritesLoaders.batchProducts.load(productId);
  }
}
