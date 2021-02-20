import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreatePriceInput {
  /*
   * Valor o precio
   */
  @IsNumber()
  @Field(() => Float)
  readonly value: number;

  /*
   * Moneda del precio
   */
  @IsString()
  @Field(() => String)
  readonly currency: string;

  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  /*
  *id del producto
  */
  @IsNumber()
  @Field(() => Int)
  readonly productId: number;

  @IsNumber()
  @Field(() => Int)
  readonly venueId: number;
}
