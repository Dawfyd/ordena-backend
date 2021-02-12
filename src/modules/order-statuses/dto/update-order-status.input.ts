import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateOrderStatusInput } from './create-order-status.input';

@InputType()
export class UpdateOrderStatusInput extends PartialType(CreateOrderStatusInput) {
  @Field(() => Int)

  /*
  *ID del estdo del pedido
  */
  id: number;
}
