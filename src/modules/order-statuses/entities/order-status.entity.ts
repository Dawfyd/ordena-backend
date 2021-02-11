import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from '../../orders/entities/order.entity';

@Entity('order_statuses')
@ObjectType()
export class OrderStatus {
  @PrimaryGeneratedColumn()
  @Field()

  /*
  *ID del esado del pedido
  */
  id: number;

  /*
  *Name del estado del pedido
  */
  @Column()
  name: string;

  @OneToMany(
    (type) => Order, (orders: Order) => orders.orderStatus)
    orders?: Order[];
}
