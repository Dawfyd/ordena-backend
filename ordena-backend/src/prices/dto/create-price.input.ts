import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePriceInput {
  
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
