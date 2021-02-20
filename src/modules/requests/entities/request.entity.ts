import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { AdditionalsPerRequest } from '../../additionals-per-requests/entities/additionals-per-request.entity';
import { ModifiersPerRequest } from '../../modifiers-per-request/entities/modifiers-per-request.entity';
import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import { RequestStatus } from '../../request-statuses/entities/request-status.entity';
import { Spot } from '../../spots/entities/spot.entity';

@Entity('requests')
@ObjectType()
export class Request {
  /*
   * ID del producto solicitado
   */
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  /*
   * Numero de unidades del solicitado
   */
  @Column({ type: 'varchar', length: 10 })
  unit: number;

  /*
   * Comentario del solicitado
   */
  @Column({ type: 'varchar', length: 255 })
  comentary: string;

  /*
   * Asociacion con producto si es una adicion
   */
  @Column({ type: 'varchar', length: 255 })
  addition: string;

  /*
   * Modificadores del solicitado
   */
  @Column({ type: 'varchar', length: 255 })
  modifier: string;

  /*
  * fecha cuando se realizo el registro
  */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /*
  * fecha cuando se actualiza el registro
  */
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne((type) => Product, (product: Product) => product.requests)
  @JoinColumn({ name: 'product_id' })
    product: Product;

  @ManyToOne((type) => Order, (order: Order) => order.requests)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne((type) => Spot, (spot: Spot) => spot.requests)
  @JoinColumn({ name: 'spot_id' })
  spot: Spot;

  @ManyToOne((type) => RequestStatus, (requestStatus: RequestStatus) => requestStatus.requests)
  @JoinColumn({ name: 'request_status_id' })
  requestStatus: RequestStatus;

  @OneToMany((type) => AdditionalsPerRequest, (additionalsPerRequests: AdditionalsPerRequest) => additionalsPerRequests.request)
  additionalsPerRequests: AdditionalsPerRequest[];

  @OneToMany((type) => ModifiersPerRequest, (modifiersPerRequests: ModifiersPerRequest) => modifiersPerRequests.request)
  modifiersPerRequests: ModifiersPerRequest[];
}
