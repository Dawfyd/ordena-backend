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
  /*
   * ID de la mesa
   */
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  // TODO: discuss about this field: must it be a entire table?

  /*
   * Estado de la mesa
   */
  @Column({ type: 'varchar', length: 20 })
  state: string;

  /*
   * Nombre de la mesa
   */
  @Column({ type: 'varchar', length: 100, nullable: true })
  name?: string;

  /*
   * Numero de la mesa
   */
  @Column({ name: 'spot_number', type: 'varchar', length: 5 })
  spotNumber: string;

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

  @ManyToOne(type => Venue, (venue: Venue) => venue.spots)
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @OneToMany(type => CustomerAssignedSpot, (customerAssignedSpot: CustomerAssignedSpot) => customerAssignedSpot.spot)
  customerAssignedSpots: CustomerAssignedSpot[];

  @OneToMany(type => WaiterAssignedSpot, (waiterAssignedSpots: WaiterAssignedSpot) => waiterAssignedSpots.spot)
  waiterAssignedSpots: WaiterAssignedSpot[];

  @OneToMany(type => Order, (orders: Order) => orders.spot)
  orders: Order[];

  @OneToMany(type => Request, (request: Request) => request.spot)
  requests: Request[];
}
