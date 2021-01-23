import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from 'src/models/categories/entities/category.entity';
import { Product } from 'src/models/products/entities/product.entity';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('assigned_Categories')
@ObjectType()
export class AssignedCategory {
  @PrimaryGeneratedColumn()
  @Field()
  /*
   * ID de la asignación de la categoria
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
    () => Category,
    (category: Category) => category.assignedCategories,  {
      eager: true,
      cascade: true,
    })

  @JoinColumn({name: 'category_id'})
  category: Category;

  @ManyToOne(
    () => Product,
    (product: Product) => product.assignedCategories,  {
      eager: true,
      cascade: true,
    })

  @JoinColumn({name: 'product_id'})
  product: Product;
}
