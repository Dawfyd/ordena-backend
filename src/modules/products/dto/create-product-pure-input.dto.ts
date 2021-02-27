import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateProductPureInput {
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
  readonly avaliable?: boolean;

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

  /*
   * ID de la categoria
   */
  @IsNumber()
  @Field(() => Int)
  readonly categoryId: number;
}
