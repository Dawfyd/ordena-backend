import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePersonInput {
  /*
   * ID de la persona
   */
  id_person: number;

  /*
   * Nombre de usuario de la persona
   */
  username: string;

  /*
   * Contraseña de la persona
   */
  password: string;

  /*
   * Numero de celular de la persona
   */
  phone_person: number;

  /*
   * Correo electronico de la persona
   */
  email_person: string;

  /*
   * URL de la foto de perfil de la persona
   */
  photo_person: string;
}
