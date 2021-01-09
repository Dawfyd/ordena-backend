import { ObjectType, Field} from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Category {

  @PrimaryGeneratedColumn()
  @Field()

  /*
  * ID de la categoria
  */
  id_category: number;

  /*
  * Descripcion de la sede o sucursal
  */
  @Column()
  name_category: string;

  /*
  *  Ubicacion de la sede o sucursal
  */
  @Column()
  description_category: string;

  /*
  * Ciudad de la sede o sucursal
  */
  @Column()
  state_category: boolean;

}
