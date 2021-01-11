import { ObjectType, Field } from '@nestjs/graphql';
import { BranchOffice } from 'src/models/branch-offices/entities/branch-office.entity';
import { Category } from 'src/models/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('menus')
@ObjectType()
export class Menu {

  @PrimaryGeneratedColumn()
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

  @ManyToOne(
    () => BranchOffice, 
    (branch_office: BranchOffice) => branch_office.menus)

  @JoinColumn({name: 'id_branch_office'})
    branch_office: BranchOffice;

  @OneToMany(
    (type) => Category, (categories: Category) => categories.menu, {
    eager: true,
    cascade: true,
  })
    categories?: Category[];
}
