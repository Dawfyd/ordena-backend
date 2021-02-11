import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNumberString, IsString } from 'class-validator';

@InputType()
export class CreateInput {
  /*
   * Nombre del cliente
   */
  @IsString()
  @Field(() => String)
  readonly name: string;

  /*
   *  Email del cliente
   */
  @IsEmail()
  @Field(() => String)
  readonly email: string;

  /*
   * Nit del cliente
   */
  @IsString()
  @Field(() => String)
  readonly nit: string;

  /*
   * Numero de celular  del cliente
   */
  @IsNumberString()
  @Field(() => String)
  readonly phone: string;
}
