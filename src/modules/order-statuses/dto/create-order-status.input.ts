import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderStatusInput {
  /*
  *Estados de pedidos
  */
  name: string;
}
