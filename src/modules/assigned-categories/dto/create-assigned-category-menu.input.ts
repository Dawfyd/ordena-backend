import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateAssignedCategoryMenuInput {
  /*
   * ID del producto al que pertenece
   */
  product_id: number;
}
