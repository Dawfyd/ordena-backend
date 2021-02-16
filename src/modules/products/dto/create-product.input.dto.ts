import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  /*
   * Nombre del producto
   */
  @IsString()
  @Field(() => String)
  readonly name: string;

  /*
   * Descripcion del producto
   */
  @IsString()
  @Field(() => String)
  readonly description: string;

  /*
   * URL de la imagen del producto
   */
  @IsString()
  @Field(() => String)
  readonly image: string;

  /*
   * Estado del producto
   */
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  readonly state?: boolean;

  /*
   * Tipo: producto o adicion
   */
  @IsString()
  @Field(() => String)
  readonly type: string;

  /*
   *  company's uuid
   */
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  /*
   * ID de la sede o sucursal
   */
  @IsNumber()
  @Field(() => Int)
  readonly venueId: number;
}
