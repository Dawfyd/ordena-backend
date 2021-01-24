import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductTypeInput {
  /*
   * codigo del tipo de producto
   */
  code: string;

  /*
   * Nombre del tipo de producto
   */
  name: string;
}
