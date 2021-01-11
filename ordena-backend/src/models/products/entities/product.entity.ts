import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from 'src/models/categories/entities/category.entity';
import { Favorite } from 'src/models/favorites/entities/favorite.entity';
import { Modifier } from 'src/models/modifiers/entities/modifier.entity';
import { Price } from 'src/models/prices/entities/price.entity';
import { ProductsOrdered } from 'src/models/products-ordered/entities/products-ordered.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID de el producto
   */
  id_product: number;

  /*
   * Nombre de el producto
   */
  @Column()
  name_product: string;

  /*
   * Descripcion del producto
   */
  @Column()
  description_product: string;

  /*
   * URL de la imagen del producto
   */
  @Column()
  image_product: string;

  /*
   * Estado del producto
   */
  @Column()
  state_product: boolean;

  /*
   * Tipo: producto o adicion
   */
  @Column()
  type_product: string;

  /*
   *  Codigo: producto o adicion
   */
  @Column()
  code_product: string;

  @ManyToOne(
    () => Category, 
    (category: Category) => category.products)

  @JoinColumn({name: 'id_category'})
  category: Category;

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
    (type) => ProductsOrdered, (products_ordered: ProductsOrdered) => products_ordered.product)
    products_ordered?: ProductsOrdered[];

  @OneToMany(
    (type) => Favorite, (favorites: Favorite) => favorites.product)
    favorites?: Favorite[];
}
