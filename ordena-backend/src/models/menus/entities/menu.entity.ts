import { ObjectType, Field } from '@nestjs/graphql';
import { Category } from 'src/models/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('menus')
@ObjectType()
export class Menu {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID del menu
   */
  id_menu?: number;

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

  @OneToMany((type) => Category, (categories) => categories.menus, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  categories: Category[];
}
