import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAssignedCategoryInput {
  /*
   * ID de la categoria al que pertenece
   */
  category_id: number;

  /*
   * ID del producto al que pertenece
   */
  product_id: number;
}
