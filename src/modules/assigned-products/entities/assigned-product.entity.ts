import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('assigned_products')
@Unique('uk_assigned_products', ['parent', 'assigned'])
@ObjectType()
export class AssignedProduct {
  @PrimaryGeneratedColumn()
  @Field()
  /*
   * ID de la asignación del producto
   */
  id: number;

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
    (product: Product) => product.assignedProducts, {
      eager: true,
      cascade: true
    })

  @JoinColumn({ name: 'parent_id' })
  parent: Product;

  @ManyToOne(
    () => Product,
    (product: Product) => product.assignedProducts, {
      eager: true,
      cascade: true
    })

  @JoinColumn({ name: 'assigned_id' })
  assigned: Product;
}
