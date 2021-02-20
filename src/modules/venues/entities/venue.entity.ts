import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { AssignedVenue } from '../../assigned-venues/entities/assigned-venue.entity';
import { Company } from '../../companies/entities/company.entity';
import { Menu } from '../../menus/entities/menu.entity';
import { Spot } from '../../spots/entities/spot.entity';
import { ProductsInVenue } from '../../products-in-venue/entities/products-in-venue.entity';
import { Price } from '../../prices/entities/price.entity';
@Entity('venues')
@ObjectType()
export class Venue {
  /*
   * ID de la sede o sucursal
   */
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  /*
   * Nombre de la sede o sucursal
   */
  @Column({ type: 'varchar', length: 100 })
  name: string;

  /*
   * Descripcion de la sede o sucursal
   */
  @Column({ type: 'varchar', length: 200 })
  description: string;

  /*
   * Ubicacion de la sede o sucursal
   */
  @Column({ type: 'varchar', length: 10 })
  phone: string;

  /*
   * Ubicacion de la sede o sucursal
   */
  @Column({ type: 'varchar', length: 150 })
  address: string;

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

  // relations

  /*
  * company that owns the venue
  */
  @ManyToOne(type => Company, (company: Company) => company.venues)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany((type) => Menu, (menus: Menu) => menus.venue)
  menus: Menu[];

  @OneToMany((type) => Spot, (spots: Spot) => spots.venue)
  spots: Spot[];

  @OneToMany((type) => AssignedVenue, (assignedVenues: AssignedVenue) => assignedVenues.venue)
  assignedVenues: AssignedVenue[];

  @OneToMany((type) => ProductsInVenue, (productsInVenues: ProductsInVenue) => productsInVenues.venue)
  productsInVenues: ProductsInVenue[];

  @OneToMany((type) => Price, price => price.venue)
  prices: Price[];
}
