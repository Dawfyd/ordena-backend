import { CreatePriceInput } from './create-price.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePriceInput extends PartialType(CreatePriceInput) {
  @Field(() => Int)
  /*
   * ID del precio
   */
  id: number;
}
