import { ObjectType, Field } from '@nestjs/graphql';
import { AdditionalsPerRequest } from 'src/models/additionals-per-requests/entities/additionals-per-request.entity';
import { ModifiersPerRequest } from 'src/models/modifiers-per-request/entities/modifiers-per-request.entity';
import { Order } from 'src/models/orders/entities/order.entity';
import { Product } from 'src/models/products/entities/product.entity';
import { RequestStatus } from 'src/models/request-statuses/entities/request-status.entity';
import { Spot } from 'src/models/spots/entities/spot.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('requests')
@ObjectType()
export class Request {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID del producto solicitado
   */
  id: number;

  /*
   * Numero de unidades del solicitado
   */
  @Column()
  unit: number;

  /*
   * Comentario del solicitado
   */
  @Column()
  comentary: string;

  /*
   * Asociacion con producto si es una adicion
   */
  @Column()
  addition: string;

  /*
   * Modificadores del solicitado
   */
  @Column()
  modifier: string;

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
    () => Product, 
    (product: Product) => product.requests)

  @JoinColumn({name: 'product_id'})
    product: Product;

  @ManyToOne(
    () => Order, 
    (order: Order) => order.requests)

  @JoinColumn({name: 'order_id'})
  order: Order;

  @ManyToOne(
    () => Spot, 
    (spot: Spot) => spot.requests)

  @JoinColumn({name: 'spot_id'})
  spot: Spot;

  @ManyToOne(
    () => RequestStatus, 
    (requestStatus: RequestStatus) => requestStatus.requests)

  @JoinColumn({name: 'request_status_id'})
  requestStatus: RequestStatus;

  @OneToMany(
    (type) => AdditionalsPerRequest, (additionalsPerRequests: AdditionalsPerRequest) => additionalsPerRequests.request)
    additionalsPerRequests?: AdditionalsPerRequest[];

  @OneToMany(
    (type) => ModifiersPerRequest, (modifiersPerRequests: ModifiersPerRequest) => modifiersPerRequests.request)
    modifiersPerRequests?: ModifiersPerRequest[];

}
