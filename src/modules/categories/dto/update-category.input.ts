import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateCategoryInput } from './create-category.input';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => Int)
  /*
   * ID de la categoria
   */
  id: number;
}
