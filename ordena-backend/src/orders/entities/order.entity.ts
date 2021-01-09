import { ObjectType, Field} from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Order {

  @PrimaryGeneratedColumn()
  @Field()

  /*
  * ID de la orden
  */
  id_order: number;

  /*
  * Valor de la orden
  */
  @Column()
  price_order: number;

  /*
  *  Estado de la orden
  */
  @Column()
  state_order: boolean;

}
