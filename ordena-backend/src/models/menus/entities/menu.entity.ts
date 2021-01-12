import { ObjectType, Field } from '@nestjs/graphql';
import { Venue } from 'src/models/venues/entities/venue.entity';
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
    () => Venue, 
    (venue: Venue) => venue.menus)

  @JoinColumn({name: 'id_venue'})
    venue: Venue;

  @OneToMany(
    (type) => Category, (categories: Category) => categories.menu, {
    eager: true,
    cascade: true,
  })
    categories?: Category[];
}
