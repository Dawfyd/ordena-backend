import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { AssignedVenue } from '../../assigned-venues/entities/assigned-venue.entity';
import { CustomerAssignedSpot } from '../../customer-assigned-spots/entities/customer-assigned-spot.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { Order } from '../../orders/entities/order.entity';
import { WaiterAssignedSpot } from '../../waiter-assigned-spots/entities/waiter-assigned-spot.entity';

@Entity('persons')
@ObjectType()
export class Person {
  /*
   * ID de la persona
   */
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  /*
   * Nombre de usuario de la persona
   */
  @Column({ type: 'varchar', length: 100 })
  name: string;

  /*
   * Numero de celular de la persona
   */
  @Column({ type: 'varchar', length: 10, unique: true })
  phone: string;

  /*
   * Correo electronico de la persona
   */
  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  /*
   * URL de la foto de perfil de la persona
   */
  @Column({ name: 'phone_url', type: 'varchar', length: 100 })
  photoUrl: string;

  /*
   * Identificador unico de la persona asociado con el ACL
   */
  @Column({ name: 'auth_uid', type: 'varchar', length: 100 })
  authUid: string

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
  @OneToMany((type) => Order, (orders: Order) => orders.person)
  orders: Order[];

  /*
    * Productos favoritos seleccionados por la persona
    */
  @OneToMany((type) => Favorite, (favorites: Favorite) => favorites.person)
  favorites: Favorite[];

  @OneToMany((type) => CustomerAssignedSpot, (customerAssignedSpot: CustomerAssignedSpot) => customerAssignedSpot.person)
  customerAssignedSpot: CustomerAssignedSpot[];

  @OneToMany((type) => AssignedVenue, (assignedVenues: AssignedVenue) => assignedVenues.person)
  assignedVenues: AssignedVenue[];

  @OneToMany((type) => WaiterAssignedSpot, (waiterAssignedSpots: WaiterAssignedSpot) => waiterAssignedSpots.person)
  waiterAssignedSpots: WaiterAssignedSpot[];
}
