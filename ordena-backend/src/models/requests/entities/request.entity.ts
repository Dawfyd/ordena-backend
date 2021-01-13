import { ObjectType, Field } from '@nestjs/graphql';
import { Order } from 'src/models/orders/entities/order.entity';
import { Product } from 'src/models/products/entities/product.entity';
import { Spot } from 'src/models/spots/entities/spot.entity';
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
   * Estado del pedido - 1: solicitado - 2: registrado - 3: servido - 4:pagado 
   */
  @Column()
  state_request: number;

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

  @ManyToOne(
    () => Spot, 
    (spot: Spot) => spot.requests)

  @JoinColumn({name: 'id_spot'})
  spot: Spot;
}
