import { ObjectType, Field } from '@nestjs/graphql';
import { Customer } from 'src/models/customers/entities/customer.entity';
import { Menu } from 'src/models/menus/entities/menu.entity';
import { Service } from 'src/models/services/entities/service.entity';
import { Spot } from 'src/models/spots/entities/spot.entity';
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
    () => Customer,
    (customer: Customer) => customer.venues, {
      eager: true,
      cascade: true
    })

  @JoinColumn({name: 'customer_id'})
    customer: Customer;

  @OneToMany(
    (type) => Menu, (menus: Menu) => menus.venue)

    menus?: Menu[];

  @OneToMany(
    (type) => Spot, (spots: Spot) => spots.venue, {
      eager: true,
      cascade: true
    })

    spots?: Spot[];

  @OneToMany(
    (type) => Service, (service: Service) => service.venue, {
      eager: true,
      cascade: true
    })

    services?: Service[];


}
