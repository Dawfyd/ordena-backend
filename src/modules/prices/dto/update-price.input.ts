import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreatePriceInput } from './create-price.input';

@InputType()
export class UpdatePriceInput extends PartialType(CreatePriceInput) {
  @Field(() => Int)
  /*
   * ID del precio
   */
  id: number;
}
