import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Order } from 'src/models/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_Statuses')
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
