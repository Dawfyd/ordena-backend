import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateProductInput {
  /*
   * Nombre del producto
   */
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly name?: string;

  /*
   * Descripcion del producto
   */
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly description?: string;

  /*
   * Estado del producto
   */
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  readonly avaliable?: boolean;
}
