import { ObjectType, Field } from '@nestjs/graphql';
import { Customer } from 'src/models/customers/entities/customer.entity';
import { Menu } from 'src/models/menus/entities/menu.entity';
import { Role } from 'src/models/roles/entities/role.entity';
import { Service } from 'src/models/services/entities/service.entity';
import { Spot } from 'src/models/spots/entities/spot.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('venues')
@ObjectType()
export class Venue {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID de la sede o sucursal
   */
  id_venue: number;

  /*
   * Descripcion de la sede o sucursal
   */
  @Column()
  description_venue: string;

  /*
   * Ubicacion de la sede o sucursal
   */
  @Column()
  location_venue: string;

  /*
   * Ciudad de la sede o sucursal
   */
  @Column()
  city_venue: string;

  /*
   * Nombre de la sede o sucursal
   */
  @Column()
  name_venue: string;

  @ManyToOne(
    () => Customer,
    (customer: Customer) => customer.venues)

  @JoinColumn({name: 'id_customer'})
    customer: Customer;

  @OneToMany(
    (type) => Menu, (menus: Menu) => menus.venue, {
      eager: true,
      cascade: true,
    })

    menus?: Menu[];

  @OneToMany(
    (type) => Spot, (spots: Spot) => spots.venue, {
      eager: true,
      cascade: true,
    })

    spots?: Spot[];

  @OneToMany(
    (type) => Role, (roles: Role) => roles.venue, {
      eager: true,
      cascade: true,
    })

    roles?: Role[];

  @OneToMany(
    (type) => Service, (service: Service) => service.venue, {
      eager: true,
      cascade: true,
    })

    services?: Service[];


}
