import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from 'src/models/products/entities/product.entity';
import { Request } from 'src/models/requests/entities/request.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('additional_Per_Requests')
@ObjectType()
export class AdditionalsPerRequest {
  @PrimaryGeneratedColumn()
  @Field()

  /*
  *ID de la solicitud por adicional
  */
  id: number;

  @ManyToOne(
    (type) => Product,
    (product: Product) => product.additionalsPerRequests,{
      eager: true,
      cascade: true
    })

  @JoinColumn({name: 'product_id'})
  product: Product

  @ManyToOne(
    (type) => Request,
    (request: Request) => request.additionalsPerRequests,{
      eager: true,
      cascade: true
    })

  @JoinColumn({name: 'request_id'})
  request: Request
}
