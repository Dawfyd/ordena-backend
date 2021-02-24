import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateAdditionalsPerRequestInput {
  /*
  *ID del producto al que pertenece
  */
  @IsNumber()
  @Field(() => Int)
  readonly productId: number;

  /*
   *  company's uuid
   */
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  /*
  *ID de la solicitud al que pertenece
  */
  @IsNumber()
  @Field(() => Int)
  readonly requestId: number;
}
