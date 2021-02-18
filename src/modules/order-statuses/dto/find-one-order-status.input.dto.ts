import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class FindOneOrderStatusInput {
  /*
  *ID del estdo del pedido
  */
  @IsNumber()
  @Field(() => Int)
  id: number;
}
