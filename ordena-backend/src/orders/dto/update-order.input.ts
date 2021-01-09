import { CreateOrderInput } from './create-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @Field(() => Int)
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
