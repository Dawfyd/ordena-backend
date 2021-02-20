import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateRequestInput {
  /*
   * Numero de unidades del solicitado
   */
  @IsNumberString()
  @Field(() => String)
  readonly unit: number;

  /*
   *  company's uuid
   */
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  /*
   * Comentario del solicitado
   */
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly comentary?: string;

  /*
   * Asociacion con producto si es una adicion
   */
  @IsString()
  @Field(() => String)
  readonly addition: string;

  /*
   * Modificadores del solicitado
   */
  @IsString()
  @Field(() => String)
  readonly modifier: string;

  /*
  *ID del producto al que pertenece
  */
  @IsNumber()
  @Field(() => Int)
  readonly productId: number;

  /*
  *ID del pedido al que pertenece
  */
  @IsNumber()
  @Field(() => Int)
  readonly orderId: number;

  /*
  *ID del mesa al que pertenence
  */
  @IsNumber()
  @Field(() => Int)
  readonly spotId: number;

  /*
  *ID del  estado de la solicitud
  */
  @IsNumber()
  @Field(() => Int)
  readonly requestStatusId: number
}
