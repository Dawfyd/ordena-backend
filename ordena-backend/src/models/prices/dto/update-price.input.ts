import { CreatePriceInput } from './create-price.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePriceInput extends PartialType(CreatePriceInput) {
  @Field(() => Int)
  /*
   * ID del precio
   */
  id_price: number;

  /*
   * Valor o precio
   */
  value_price: number;

  /*
   * Moneda del precio
   */
  currency: string;

  /*
   * Numero de opcion del precio
   */
  option_price: number;
}
