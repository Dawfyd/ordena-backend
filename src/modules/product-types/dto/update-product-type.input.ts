import { CreateProductTypeInput } from './create-product-type.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductTypeInput extends PartialType(CreateProductTypeInput) {
  @Field(() => Int)
  /*
   * ID del tipo de producto
   */
  id: number;
}
