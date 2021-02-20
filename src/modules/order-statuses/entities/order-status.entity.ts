import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Order } from '../../orders/entities/order.entity';

@Entity('order_statuses')
@ObjectType()
export class OrderStatus {
  /*
  *ID del estado del pedido
  */
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  /*
  *Name del estado del pedido
  */
  @Column({ type: 'varchar', length: 45 })
  name: string;

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

  @OneToMany((type) => Order, (orders: Order) => orders.orderStatus)
  orders: Order[];
}
