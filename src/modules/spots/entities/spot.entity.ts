import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Venue } from '../../venues/entities/venue.entity';
import { Order } from '../../orders/entities/order.entity';
import { CustomerAssignedSpot } from '../../customer-assigned-spots/entities/customer-assigned-spot.entity';
import { WaiterAssignedSpot } from '../../waiter-assigned-spots/entities/waiter-assigned-spot.entity';
import { Request } from '../../requests/entities/request.entity';

@Entity('spots')
@ObjectType()
export class Spot {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID de la mesa
   */
  id: number;

  /*
   * Estado de la mesa
   */
  @Column()
  state: string;

  /*
   * Nombre de la mesa
   */
  @Column()
  name: string;

  /*
   * Numero de la mesa
   */
  @Column()
  number: number;

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
    (venue: Venue) => venue.spots,{
      eager: true,
      cascade: true
    })

  @JoinColumn({name: 'venue_id'})
    venue: Venue;

    @OneToMany(
      (type) => CustomerAssignedSpot, (customerAssignedSpot: CustomerAssignedSpot) => customerAssignedSpot.spot)
      customerAssignedSpot?: CustomerAssignedSpot[];

    @OneToMany(
      (type) => WaiterAssignedSpot, (waiterAssignedSpots: WaiterAssignedSpot) => waiterAssignedSpots.spot)
      waiterAssignedSpots?: WaiterAssignedSpot[];

    @OneToMany(
      (type) => Order, (orders: Order) => orders.spot)
      orders?: Order[];

    @OneToMany(
      (type) => Request, (request: Request) => request.spot)
      requests?: Request[];
}
