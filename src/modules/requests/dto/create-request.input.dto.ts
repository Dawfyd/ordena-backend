import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateRequestInput {
  /*
   * Numero de unidades del solicitado
   */
  @IsNumber()
  @Field(() => Int)
  unit: number;

  /*
   * Comentario del solicitado
   */
  @IsString()
  @Field(() => Int)
  comentary?: string;
  /*
   * Asociacion con producto si es una adicion
   */
  @IsString()
  @Field(() => Int)
  addition: string;

  /*
   * Modificadores del solicitado
   */
  @IsString()
  @Field(() => Int)
  modifier: string;

  /*
  *ID del producto al que pertenece
  */
  @IsNumber()
  @Field(() => Int)
  product_id: number;

  /*
  *ID del pedido al que pertenece
  */
  @IsNumber()
  @Field(() => Int)
  order_id: number;

  /*
  *ID del mesa al que pertenence
  */
  @IsNumber()
  @Field(() => Int)
  spot_id: number;

  /*
  *ID del  estado de la solicitud
  */
  @IsNumber()
  @Field(() => Int)
  request_status_id: number
}
