import { ObjectType, Field } from '@nestjs/graphql';
import { Menu } from 'src/models/menus/entities/menu.entity';
import { Product } from 'src/models/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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


  @ManyToOne(
    () => Menu, 
    (menu: Menu) => menu.categories)

  @JoinColumn({name: 'id_menu'})
  menu: Menu;

  @OneToMany(
    (type) => Product, (products: Product) => products.category, {
    eager: true,
    cascade: true,
  })
  products?: Product[];
}
