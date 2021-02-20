import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class CreateProductTypeInput {
  /*
   * codigo del tipo de producto
   */
  @IsString()
  @Length(3, 5)
  @Field(() => String)
  readonly code: string;

  /*
   * Nombre del tipo de producto
   */
  @IsString()
  @Field(() => String)
  readonly name: string;
}
