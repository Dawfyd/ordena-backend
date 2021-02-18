import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { OrderStatus } from '../../order-statuses/entities/order-status.entity';
import { Person } from '../../persons/entities/person.entity';
import { Request } from '../../requests/entities/request.entity';
import { Spot } from '../../spots/entities/spot.entity';

@Entity('orders')
@ObjectType()
export class Order {
  /*
   * ID de la orden
   */
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  /*
   * Valor de la orden
   */
  @Column()
  price: number;

  /*
   *  Estado de la orden
   */
  @Column()
  state: boolean;

  /*
  *fecha cuando se realizo el registro
  */
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  /*
  *fecha cuando se actualiza el registro
  */
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  @ManyToOne(
    () => Person,
    (person: Person) => person.orders, {
      eager: true,
      cascade: true
    })

  @JoinColumn({ name: 'person_id' })
    person: Person;

  @ManyToOne(
    (type) => Spot, (spot: Spot) => spot.orders, {
      eager: true,
      cascade: true
    })
  @JoinColumn({ name: 'spot_id' })
  spot: Spot;

  @ManyToOne(
    (type) => OrderStatus, (orderStatus: OrderStatus) => orderStatus.orders)

  @JoinColumn({ name: 'order_status_id' })
  orderStatus: OrderStatus;

  @OneToMany(
    (type) => Request, (requests: Request) => requests.order)
    requests?: Request[];
}
