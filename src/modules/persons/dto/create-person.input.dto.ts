import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNumberString, IsString, Length } from 'class-validator';

@InputType()
export class CreatePersonInput {
  /*
   * Nombre de usuario de la persona
   */
  @IsString()
  @Field(() => String)
  readonly name: string;

  /*
   * Numero de celular de la persona
   */
  @IsNumberString()
  @Length(10, 10)
  @Field(() => String)
  readonly phone: string;

  /*
   * Correo electronico de la persona
   */
  @IsEmail()
  @Field(() => String)
  readonly email: string;

  /*
   * URL de la foto de perfil de la persona
   */
  @IsString()
  @Field(() => String)
  readonly photoUrl: string;

  /*
   * Contraseña de la persona
   */
  @IsString()
  @Field(() => String)
  readonly password: string;
}
