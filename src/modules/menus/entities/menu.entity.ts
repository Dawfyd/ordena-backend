import { ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { Venue } from '../../venues/entities/venue.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity('menus')
@ObjectType()
export class Menu {
  @PrimaryGeneratedColumn()
  /*
   * ID del menu
   */
  id: number;

  /*
   * Nombre del cliente
   */
  @Column()
  name: string;

  /*
   *  Estado del menu
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
    () => Venue,
    (venue: Venue) => venue.menus, {
      eager: true,
      cascade: true
    })

  @JoinColumn({ name: 'venue_id' })
    venue: Venue;

  @OneToMany(
    (type) => Category, (categories: Category) => categories.menu)
    categories?: Category[];
}
