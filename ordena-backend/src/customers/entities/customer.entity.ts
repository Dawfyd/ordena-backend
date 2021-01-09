import { ObjectType, Field} from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Customer {

  @PrimaryGeneratedColumn()
  @Field()

  /*
  * ID del cliente
  */
  id_customer: number;

  /*
  * Nombre del cliente
  */
  @Column()
  name_customer: string;

  /*
  *  Email del cliente
  */
  @Column()
  email_customer: string;

  /*
  * Nit del cliente
  */
  @Column()
  nit_customer: number;

  /*
  * Telefono del cliente
  */
  @Column()
  telephone_customer: number;
}
