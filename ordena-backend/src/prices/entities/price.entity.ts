import { ObjectType, Field} from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Price {

  @PrimaryGeneratedColumn()
  @Field()

  /*
  * ID del precio
  */
  id_price: number;

  /*
  * Valor o precio
  */
  @Column()
  value_price: number;

  /*
  * Moneda del precio
  */
  @Column()
  currency: string;

  /*
  * Numero de opcion del precio
  */
  @Column()
  option_price: number;

}
