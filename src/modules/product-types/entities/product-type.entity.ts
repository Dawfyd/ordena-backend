import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Product } from '../../products/entities/product.entity';

@Entity('product_types')
@ObjectType()
export class ProductType {
  /*
   * ID del tipo de producto
   */
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  /*
   * codigo del tipo de producto
   */
  @Column({ type: 'varchar', length: 5 })
  code: string;

  /*
   * Nombre del tipo de producto
   */
  @Column({ type: 'varchar', length: 100 })
  name: string;

  /*
  *fecha cuando se realizo el registro
  */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /*
  *fecha cuando se actualiza el registro
  */
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany((type) => Product, (products: Product) => products.productType)
  products: Product[];
}
