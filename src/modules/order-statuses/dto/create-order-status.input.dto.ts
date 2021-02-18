import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateOrderStatusInput {
  /*
  *Nombre del Estado de pedido
  */
  @IsString( )
  @Field(() => String)
  readonly name: string;
}
