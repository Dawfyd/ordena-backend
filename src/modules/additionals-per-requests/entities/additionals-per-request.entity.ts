import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Request } from '../../requests/entities/request.entity';

@Entity('additional_per_requests')
@ObjectType()
export class AdditionalsPerRequest {
  /*
  *ID de la solicitud por adicional
  */
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne((type) => Product, (product: Product) => product.additionalsPerRequests)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @ManyToOne((type) => Request, (request: Request) => request.additionalsPerRequests)
  @JoinColumn({ name: 'request_id' })
  request: Request
}
