import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Product } from '../../products/entities/product.entity';

@Entity('product_types')
@ObjectType()
export class ProductType {
  @PrimaryGeneratedColumn()
  @Field()
  /*
   * ID del tipo de producto
   */
  id: number;

  /*
   * codigo del tipo de producto
   */
  @Column()
  code: string;

  /*
   * Nombre del tipo de producto
   */
  @Column()
  name: string;

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

  @OneToMany(
    (type) => Product, (product: Product) => product.productType)
    Products?: Product[];
}