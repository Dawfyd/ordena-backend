import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { UpdateFavoriteInput } from './dto/update-favorite.input';

@Resolver(() => Favorite)
export class FavoritesResolver {
  constructor (private readonly favoritesService: FavoritesService) {}

  @Mutation(() => Favorite)
  createFavorite (
    @Args('createFavoriteInput') createFavoriteInput: CreateFavoriteInput
  ) {
    return this.favoritesService.create(createFavoriteInput);
  }

  @Query(() => [Favorite], { name: 'favorites' })
  findAll () {
    return this.favoritesService.findAll();
  }

  @Query(() => Favorite, { name: 'favorite' })
  findOne (@Args('id', { type: () => Int }) id: number) {
    return this.favoritesService.findOne(id);
  }

  @Mutation(() => Favorite)
  updateFavorite (
    @Args('updateFavoriteInput') updateFavoriteInput: UpdateFavoriteInput
  ) {
    return this.favoritesService.update(
      updateFavoriteInput.id,
      updateFavoriteInput
    );
  }

  @Mutation(() => Favorite)
  removeFavorite (@Args('id', { type: () => Int }) id: number) {
    return this.favoritesService.remove(id);
  }
}
