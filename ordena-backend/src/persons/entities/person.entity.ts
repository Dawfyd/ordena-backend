import { ObjectType, Field} from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Person {

  @PrimaryGeneratedColumn()
  @Field()

  /*
  * ID de la persona
  */
  id_person: number;

  /*
  * Nombre de usuario de la persona
  */
  @Column()
  username: string;

  /*
  * Contraseña de la persona
  */
  @Column()
  password: string;

  /*
  * Numero de celular de la persona
  */
  @Column()
  phone_person: number;

  /*
  * Correo electronico de la persona
  */
  @Column()
  email_person: string;

  /*
  * URL de la foto de perfil de la persona
  */
  @Column()
  photo_person: string;

}
