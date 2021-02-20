import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsNumberString, IsString } from 'class-validator';

@InputType()
export class CreateRequestInput {
  /*
   * Numero de unidades del solicitado
   */
  @IsNumberString()
  @Field(() => String)
  unit: number;

  /*
   *  company's uuid
   */
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  /*
   * Comentario del solicitado
   */
  @IsString()
  @Field(() => String)
  comentary?: string;

  /*
   * Asociacion con producto si es una adicion
   */
  @IsString()
  @Field(() => String)
  addition: string;

  /*
   * Modificadores del solicitado
   */
  @IsString()
  @Field(() => String)
  modifier: string;

  /*
  *ID del producto al que pertenece
  */
  @IsNumber()
  @Field(() => Int)
  productId: number;

  /*
  *ID del pedido al que pertenece
  */
  @IsNumber()
  @Field(() => Int)
  orderId: number;

  /*
  *ID del mesa al que pertenence
  */
  @IsNumber()
  @Field(() => Int)
  spotId: number;

  /*
  *ID del  estado de la solicitud
  */
  @IsNumber()
  @Field(() => Int)
  requestStatusId: number
}
