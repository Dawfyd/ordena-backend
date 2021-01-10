import { ObjectType, Field} from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products_ordered')
@ObjectType()
export class ProductsOrdered {

  @PrimaryGeneratedColumn()
  @Field()

  /*
  * ID del producto pedido
  */
  id_product_ordered: number;

  /*
  * Numero de unidades del pedido
  */
  @Column()
  unit_product_ordered: number;

  /*
  * Comentario del pedido
  */
  @Column()
  comentary_product_ordered: string;

  /*
  * Estado del pedido - Servido?
  */
  @Column()
  state_served: boolean;

  /*
  * Asociacion con producto si es una adicion 
  */
  @Column()
  addition_product: string;

  /*
  * Modificadores del pedido
  */
  @Column()
  modifier_product: string;

  /*
  *  Estado del pedido - Pagado?
  */
  @Column()
  state_product_paid: boolean;
}
