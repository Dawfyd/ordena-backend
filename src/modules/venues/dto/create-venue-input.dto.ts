import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNumberString, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateVenueInput {
  /*
   * UUID del company
   */
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  /*
   * Nombre de la sede o sucursal
   */
  @IsString()
  @Field(() => String)
  readonly name: string;

  /*
   * Descripcion de la sede o sucursal
   */
  @IsString()
  @Field(() => String)
  readonly description: string;

  /*
   * Ubicacion de la sede o sucursal
   */
  @IsString()
  @Field(() => String)
  readonly address: string;

  /*
   * Ubicacion de la sede o sucursal
   */
  @IsNumberString()
  @Field(() => String)
  readonly phone: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int)
  readonly capacity?: number;
}
