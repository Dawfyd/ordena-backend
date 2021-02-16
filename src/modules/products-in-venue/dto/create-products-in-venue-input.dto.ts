import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateProductsInVenueInput {
  /*
   * UUID del company
   */
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  /*
   * Estado del producto en la sede o sucursal
   */
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  readonly avaliable?: boolean;

  /*
  * ID del producto al que pertenece
  */
  @IsNumber()
  @Field(() => Int)
  readonly productId: number;

  /*
  * ID de la sede al que pertenece
  */
  @IsNumber()
  @Field(() => Int)
  readonly venueId: number;
}
