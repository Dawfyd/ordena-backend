import { ObjectType, Field } from '@nestjs/graphql';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('assigned_products')
@Unique('uk_assigned_products', ['parent', 'assigned'])
@ObjectType()
export class AssignedProduct {
  /*
   * ID de la asignación del producto
   */
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

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

  // relations

  @ManyToOne(type => Product, (product: Product) => product.assignedProducts)
  @JoinColumn({ name: 'parent_id' })
  parent: Product;

  @ManyToOne(type => Product, (product: Product) => product.assignedProducts)
  @JoinColumn({ name: 'assigned_id' })
  assigned: Product;
}
