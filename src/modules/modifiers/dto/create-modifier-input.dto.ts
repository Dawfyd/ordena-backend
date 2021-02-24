import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString } from 'class-validator';

@InputType()
export class CreateModifierInput {
  /*
   * Nombre del modificador
   */
  @IsString()
  @Field(() => String)
  readonly name: string;

  @IsBoolean()
  @Field(() => Boolean)
  readonly avaliable: boolean;

  /*
   * Opcion del modificador, es opcional(true) o excluyente(false)
   */
  @IsBoolean()
  @Field(() => Boolean)
  optional: boolean;

  /*
   * tipo del modificador, A (todos) , C(categoria) , P(producto)
   */
  @IsString()
  @Field(() => String)
  readonly type: string;

  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  /*
  *id del producto
  */
  @IsInt()
  @Field(() => Int)
  readonly productId: number;
}
