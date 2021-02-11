import { ObjectType, Field } from '@nestjs/graphql';
import { AssignedVenue } from 'src/models/assigned-venues/entities/assigned-venue.entity';
import { CustomerAssignedSpot } from 'src/models/customer-assigned-spots/entities/customer-assigned-spot.entity';
import { Favorite } from 'src/models/favorites/entities/favorite.entity';
import { Order } from 'src/models/orders/entities/order.entity';
import { WaiterAssignedSpot } from 'src/models/waiter-assigned-spots/entities/waiter-assigned-spot.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('persons')
@ObjectType()
export class Person {
  @PrimaryGeneratedColumn()
  @Field()
  /*
   * ID de la persona
   */
  id: number;

  /*
   * Nombre de usuario de la persona
   */
  @Column()
  username: string;

  /*
   * Numero de celular de la persona
   */
  @Column({ unique: true })
  phone: string;

  /*
   * Correo electronico de la persona
   */
  @Column({ unique: true })
  email: string;

  /*
   * URL de la foto de perfil de la persona
   */
  @Column()
  photo: string;

  /*
   * Identificador unico de la persona asociado con el ACL
   */
  @Column()
  authUid: string

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

  @OneToMany(
    (type) => Order, (orders: Order) => orders.person)
  orders?: Order[];

  /*
    * Productos favoritos seleccionados por la persona
    */
  @OneToMany(
    (type) => Favorite, (favorites: Favorite) => favorites.person)

  favorites?: Favorite[];

  @OneToMany(
    (type) => CustomerAssignedSpot, (customerAssignedSpot: CustomerAssignedSpot) => customerAssignedSpot.person)
    customerAssignedSpot?: CustomerAssignedSpot[];

  @OneToMany(
    (type) => AssignedVenue,(assignedVenues: AssignedVenue) => assignedVenues.person)
    assignedVenues?: AssignedVenue[];

  @OneToMany(
    (type) => WaiterAssignedSpot, (waiterAssignedSpots: WaiterAssignedSpot) => waiterAssignedSpots.person)
    waiterAssignedSpots?: WaiterAssignedSpot[];

}
