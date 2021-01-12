import { ObjectType, Field } from '@nestjs/graphql';
import { Order } from 'src/models/orders/entities/order.entity';
import { Product } from 'src/models/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('requests')
@ObjectType()
export class Request {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID del producto solicitado
   */
  id_request: number;

  /*
   * Numero de unidades del solicitado
   */
  @Column()
  unit_request: number;

  /*
   * Comentario del solicitado
   */
  @Column()
  comentary_request: string;

  /*
   * Estado del solicitado - Servido?
   */
  @Column()
  state_served_request: boolean;

  /*
   * Asociacion con producto si es una adicion
   */
  @Column()
  addition_request: string;

  /*
   * Modificadores del solicitado
   */
  @Column()
  modifier_request: string;

  /*
   *  Estado del solicitado - Pagado?
   */
  @Column()
  state_paid_request: boolean;

  @ManyToOne(
    () => Product, 
    (product: Product) => product.requests)

  @JoinColumn({name: 'id_product'})
    product: Product;

  @ManyToOne(
    () => Order, 
    (order: Order) => order.requests)

  @JoinColumn({name: 'id_order'})
  order: Order;
}
