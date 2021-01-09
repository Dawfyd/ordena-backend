import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Menu {
  @PrimaryGeneratedColumn()
  @Field()

  /*
  * ID del menu
  */
  id_menu: number;

  /*
  * Nombre del cliente
  */
  @Column()
  name_menu: string;

  /*
  *  Estado del menu
  */
  @Column()
  state_menu: boolean;

}
