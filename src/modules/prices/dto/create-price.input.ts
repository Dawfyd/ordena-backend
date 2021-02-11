import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePriceInput {

  /*
   * Valor o precio
   */
  value: number;

  /*
   * Moneda del precio
   */
  currency: string;

  /*
   * Numero de opcion del precio
   */
  option: number;

  /*
  *id del producto
  */
  product_id: number;
}
