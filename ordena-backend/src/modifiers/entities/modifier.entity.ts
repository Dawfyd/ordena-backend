import { ObjectType, Field} from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Modifier {
  
  @PrimaryGeneratedColumn()
  @Field()

  /*
  * ID del modificador
  */
  id_modifier: number;

  /*
  * Nombre del modificador
  */
  @Column()
  name_modifier: string;

  /*
  *  Estado del modificador
  */
  @Column()
  state_modifier: string;

  /*
  * Opcion del modificador 
  */
  @Column()
  optional_modifier: string;

  /*
  * tipo del modificador 
  */
  @Column()
  type_modifier: string;

  /*
  * Codigo del modificador
  */
  @Column()
  code_modifier: string;

  /*
  * Opciones de modificador excluyente 
  */
  @Column()
  string_modifier_option: string;
}
