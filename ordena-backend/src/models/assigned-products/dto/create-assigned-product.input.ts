import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateAssignedProductInput {
  /*
   * ID producto padre
   */
  parent_id: number;

  /*
   * ID producto asignado.
   */
  assigned_id: number;
}
