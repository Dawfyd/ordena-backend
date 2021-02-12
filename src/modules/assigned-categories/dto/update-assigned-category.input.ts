import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateAssignedCategoryInput } from './create-assigned-category.input';

@InputType()
export class UpdateAssignedCategoryInput extends PartialType(CreateAssignedCategoryInput) {
  @Field(() => Int)
  /*
   * ID de la asignación de la categoria
   */
  id: number;
}
