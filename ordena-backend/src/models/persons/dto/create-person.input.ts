import { InputType } from '@nestjs/graphql';

@InputType()
export class CreatePersonInput {
  /*
   * Nombre de usuario de la persona
   */
  username: string;

  /*
   * Numero de celular de la persona
   */
  phone: number;

  /*
   * Correo electronico de la persona
   */
  email: string;

  /*
   * URL de la foto de perfil de la persona
   */
  photo: string;
}
