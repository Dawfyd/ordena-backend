import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from 'src/models/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('prices')
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
    (product: Product) => product.prices)

  @JoinColumn({name: 'id_product'})
    product: Product;
}
