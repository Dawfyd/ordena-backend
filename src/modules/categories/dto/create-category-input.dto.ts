import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  /*
   * Descripcion de la sede o sucursal
   */
  @IsString()
  @Field(() => String)
  name: string;

  /*
   *  Ubicacion de la sede o sucursal
   */
  @IsString()
  @Field(() => String)
  description: string;

  /*
   * Ciudad de la sede o sucursal
   */
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  state: boolean;

  @IsString()
  @Field(() => String)
  companyUuid: string;

  /*
   * ID del menu al que pertenece
   */
  @IsNumber()
  @Field(() => Int)
  menuId: number
}
