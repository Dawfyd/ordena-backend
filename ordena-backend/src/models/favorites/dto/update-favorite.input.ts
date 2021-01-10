import { CreateFavoriteInput } from './create-favorite.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFavoriteInput extends PartialType(CreateFavoriteInput) {
  @Field(() => Int)
  /*
   * ID del producto favorito
   */
  id_favorites: number;

  /*
   * Estado del producto favorito
   */
  state_favorite: boolean;
}
