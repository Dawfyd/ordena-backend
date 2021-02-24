import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { ProductsInVenue } from '../../products-in-venue/entities/products-in-venue.entity';
import { AdditionalsPerRequest } from '../../additionals-per-requests/entities/additionals-per-request.entity';
import { AssignedCategory } from '../../assigned-categories/entities/assigned-category.entity';
import { AssignedProduct } from '../../assigned-products/entities/assigned-product.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { Modifier } from '../../modifiers/entities/modifier.entity';
import { Price } from '../../prices/entities/price.entity';
import { ProductType } from '../../product-types/entities/product-type.entity';
import { Request } from '../../requests/entities/request.entity';

@Entity('products')
@ObjectType()
export class Product {
  /*
   * ID de el producto
   */
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  /*
   * Nombre de el producto
   */
  @Column({ type: 'varchar', length: 100 })
  name: string;

  /*
   * Descripcion del producto
   */
  @Column({ type: 'varchar', length: 200 })
  description: string;

  /*
   * URL de la imagen del producto
   */
  @Column({ type: 'varchar', length: 100 })
  image: string;

  /*
   * Estado del producto
   */
  @Column({ nullable: true, default: true })
  state?: boolean;

  /*
   * Tipo: producto o adicion
   */
  @Column({ type: 'varchar', length: 100 })
  type: string;

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

  @OneToMany((type) => AssignedCategory, (assignedCategory: AssignedCategory) => assignedCategory.product)
  assignedCategories: AssignedCategory[];

  @OneToMany((type) => AssignedProduct, (assignedProduct: AssignedProduct) => assignedProduct.parent)
  parentProducts: AssignedProduct[];

  @OneToMany((type) => AssignedProduct, (assignedProduct: AssignedProduct) => assignedProduct.assigned)
  assignedProducts: AssignedProduct[];

  @ManyToOne(() => ProductType, (productType: ProductType) => productType.products)
  @JoinColumn({ name: 'product_type_id' })
  productType: ProductType;

  @OneToMany((type) => Modifier, (modifiers: Modifier) => modifiers.product)
  modifiers: Modifier[];

  @OneToMany((type) => Price, (prices: Price) => prices.product)
  prices: Price[];

  @OneToMany((type) => Request, (requests: Request) => requests.product)
  requests: Request[];

  @OneToMany((type) => Favorite, (favorites: Favorite) => favorites.product)
  favorites: Favorite[];

  @OneToMany((type) => AdditionalsPerRequest, (additionalsPerRequests: AdditionalsPerRequest) => additionalsPerRequests.product)
  additionalsPerRequests: AdditionalsPerRequest[]

  @OneToMany((type) => ProductsInVenue, (productsInVenues: ProductsInVenue) => productsInVenues.product)
  productsInVenues: ProductsInVenue[];
}
