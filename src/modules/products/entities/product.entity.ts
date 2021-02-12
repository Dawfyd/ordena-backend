import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
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

  @OneToMany(
    (type) => AssignedProduct, (assignedProduct: AssignedProduct) => assignedProduct.parent)
    parentProducts?: AssignedProduct[];

  @OneToMany(
    (type) => AssignedProduct, (assignedProduct: AssignedProduct) => assignedProduct.assigned)
    assignedProducts?: AssignedProduct[];

  @ManyToOne(
    () => ProductType,
    (productType: ProductType) => productType.Products, {
      eager: true,
      cascade: true
    })

  @JoinColumn({ name: 'product_type_id' })
  productType: ProductType;

  @OneToMany(
    (type) => Modifier, (modifiers: Modifier) => modifiers.product)
  modifiers?: Modifier[];

  @OneToMany(
    (type) => Price, (prices: Price) => prices.product)
  prices?: Price[];

  @OneToMany(
    (type) => Request, (requests: Request) => requests.product)
  requests?: Request[];

  @OneToMany(
    (type) => Favorite, (favorites: Favorite) => favorites.product)
  favorites?: Favorite[];

  @OneToMany(
    (type) => AdditionalsPerRequest, (additionalsPerRequests: AdditionalsPerRequest) => additionalsPerRequests.product)
    additionalsPerRequests?: AdditionalsPerRequest
}