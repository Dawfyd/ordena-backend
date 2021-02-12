import { Field, ObjectType } from '@nestjs/graphql';
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
  /*
   * ID del menu
   */
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  /*
   * Nombre del cliente
   */
  @Column({ type: 'varchar', length: 100 })
  name: string;

  /*
   * disponibilidad del menu
   */
  @Column({ type: 'boolean', default: false })
  avaliable?: boolean;

  /*
   * fecha cuando se realizo el registro
   */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /*
   *fecha cuando se actualiza el registro
   */
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // relations

  /*
   * Venue that owns the menu
   */
  @ManyToOne(type => Venue, (venue: Venue) => venue.menus)
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  /*
   * Categories belongs to the venue
   */
  @OneToMany(type => Category, (categories: Category) => categories.menu)
  categories: Category[];
}
