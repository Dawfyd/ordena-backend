import { CreatePersonInput } from './create-person.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePersonInput extends PartialType(CreatePersonInput) {
  @Field(() => Int)
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
