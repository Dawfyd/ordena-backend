import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  /*
   * ID de la orden
   */
  id: number;

  /*
   * Valor de la orden
   */
  price: number;

  /*
   *  Estado de la orden
   */
  state: boolean;

  /*
   *  ID de la persona
   */

   person_id: number;

   /*
   *ID de la mesa
   */
    spot_id: number;

    /*
    *ID del estado del pedido
    */
    order_status_id: number;

}
