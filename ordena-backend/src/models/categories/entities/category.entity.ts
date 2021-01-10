import { ObjectType, Field } from '@nestjs/graphql';
import { Menu } from 'src/models/menus/entities/menu.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID de la categoria
   */
  id_category?: number;

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

  @ManyToOne(() => Menu, (menu) => menu.categories)

  
  @JoinColumn()
  menus: Menu;
}
