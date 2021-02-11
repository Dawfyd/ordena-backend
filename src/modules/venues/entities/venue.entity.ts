import { ObjectType, Field } from '@nestjs/graphql';
import { type } from 'os';
import { AssignedVenue } from '../../assigned-venues/entities/assigned-venue.entity';
import { Company } from '../../companies/entities/company.entity';
import { Menu } from '../../menus/entities/menu.entity';
import { Spot } from '../../spots/entities/spot.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('venues')
@ObjectType()
export class Venue {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID de la sede o sucursal
   */
  id: number;

  /*
   * Nombre de la sede o sucursal
   */
  @Column()
  name: string;

  /*
   * Descripcion de la sede o sucursal
   */
  @Column()
  description: string;

  /*
   * Ubicacion de la sede o sucursal
   */
  @Column()
  location: string;

  /*
   * Ciudad de la sede o sucursal
   */
  @Column()
  city: string;

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
    () => Company,
    (company: Company) => company.venues, {
      eager: true,
      cascade: true
    })

  @JoinColumn({name: 'company_id'})
    company: Company;

  @OneToMany(
    (type) => Menu, (menus: Menu) => menus.venue)

    menus?: Menu[];

  @OneToMany(
    (type) => Spot, (spots: Spot) => spots.venue)

    spots?: Spot[];

  @OneToMany(
    (type) => AssignedVenue, (assignedVenues: AssignedVenue) => assignedVenues.venue)

    assignedVenues?: AssignedVenue[];

}
