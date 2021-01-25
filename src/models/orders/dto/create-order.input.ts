import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  /*
   * ID de la orden
   */
  id_order: number;

  /*
   * Valor de la orden
   */
  price_order: number;

  /*
   *  Estado de la orden
   */
  state_order: boolean;
}
