import { ObjectType, Field } from '@nestjs/graphql';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('assigned_categories')
@Unique('uk_assigned_categories', ['category', 'product'])
@ObjectType()
export class AssignedCategory {
  /*
   * ID de la asignación de la categoria
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

  @ManyToOne(type => Category, (category: Category) => category.assignedCategories)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(type => Product, (product: Product) => product.assignedCategories)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
