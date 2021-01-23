import { ObjectType, Field } from '@nestjs/graphql';
import { AssignedCategory } from 'src/models/assigned-categories/entities/assigned-category.entity';
import { Menu } from 'src/models/menus/entities/menu.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID de la categoria
   */
  id: number;

  /*
   * Descripcion de la sede o sucursal
   */
  @Column()
  name: string;

  /*
   *  Ubicacion de la sede o sucursal
   */
  @Column()
  description: string;

  /*
   * Ciudad de la sede o sucursal
   */
  @Column()
  state: boolean;

  /*
  *fecha cuando se realizo el registro
  */
  @CreateDateColumn()
  created_at: Date;

  /*
  *fecha cuando se actualiza el registro
  */
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    () => Menu,
    (menu: Menu) => menu.categories, {
      eager: true,
      cascade: true,
    })

  @JoinColumn({name: 'menu_id'})
  menu: Menu;

  @OneToMany(
    (type) => AssignedCategory, (assignedCategory: AssignedCategory) => assignedCategory.category)
    assignedCategories?: AssignedCategory[];
}
