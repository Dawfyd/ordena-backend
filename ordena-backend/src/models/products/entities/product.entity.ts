import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AssignedCategory } from 'src/models/assigned-categories/entities/assigned-category.entity';
import { Favorite } from 'src/models/favorites/entities/favorite.entity';
import { Modifier } from 'src/models/modifiers/entities/modifier.entity';
import { Price } from 'src/models/prices/entities/price.entity';
import { ProductType } from 'src/models/product-types/entities/product-type.entity';
import { Request } from 'src/models/requests/entities/request.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('products')
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID de el producto
   */
  id: number;

  /*
   * Nombre de el producto
   */
  @Column()
  name: string;

  /*
   * Descripcion del producto
   */
  @Column()
  description: string;

  /*
   * URL de la imagen del producto
   */
  @Column()
  image: string;

  /*
   * Estado del producto
   */
  @Column()
  state: boolean;

  /*
   * Tipo: producto o adicion
   */
  @Column()
  type: string;

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
    (type) => AssignedCategory, (assignedCategory: AssignedCategory) => assignedCategory.product)
  assignedCategories?: AssignedCategory[];

  @ManyToOne(
    () => ProductType,
    (productType: ProductType) => productType.Products,  {
      eager: true,
      cascade: true,
    })

  @JoinColumn({name: 'product_type_id'})
  productType: ProductType;

  @OneToMany(
    (type) => Modifier, (modifiers: Modifier) => modifiers.product, {
    eager: true,
    cascade: true,
  })
  modifiers?: Modifier[];

  @OneToMany(
    (type) => Price, (prices: Price) => prices.product, {
    eager: true,
    cascade: true,
  })
  prices?: Price[];

  @OneToMany(
    (type) => Request, (requests: Request) => requests.product)
  requests?: Request[];

  @OneToMany(
    (type) => Favorite, (favorites: Favorite) => favorites.product)
  favorites?: Favorite[];
}
