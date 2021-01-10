import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
