import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateMenuInput {
  /*
   * Nombre del cliente
   */
  @IsString()
  @Field(() => String)
  readonly name: string;

  /*
   *  Estado del menu
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
}
