import { CreateCategoryInput } from './create-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';


@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => Int)
  /*
   * ID de la categoria
   */
  id_category: number;
}
