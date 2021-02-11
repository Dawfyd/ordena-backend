import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateFavoriteInput } from './create-favorite.input';

@InputType()
export class UpdateFavoriteInput extends PartialType(CreateFavoriteInput) {
  @Field(() => Int)
  /*
   * ID del producto favorito
   */
  id: number;
}
