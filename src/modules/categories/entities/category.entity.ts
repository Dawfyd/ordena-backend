import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { AssignedCategory } from '../../assigned-categories/entities/assigned-category.entity';
import { Menu } from '../../menus/entities/menu.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('categories')
@ObjectType()
export class Category {
  /*
   * ID de la categoria
   */
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  /*
   * Descripcion de la sede o sucursal
   */
  @Column({ type: 'varchar', length: 150 })
  name: string;

  /*
   *  Ubicacion de la sede o sucursal
   */
  @Column({ type: 'varchar', length: 200 })
  description: string;

  /*
   * Ciudad de la sede o sucursal
   */
  @Column({ type: 'boolean', default: true })
  avaliable: boolean;

  /*
  *fecha cuando se realizo el registro
  */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /*
  *fecha cuando se actualiza el registro
  */
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Menu, (menu: Menu) => menu.categories)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @OneToMany(type => AssignedCategory, (assignedCategory: AssignedCategory) => assignedCategory.category)
  assignedCategories: AssignedCategory[];

  @OneToMany((type) => Product, (products: Product) => products.category)
  products: Product[];
}
