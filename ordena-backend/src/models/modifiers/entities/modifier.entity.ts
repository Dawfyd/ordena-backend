import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from 'src/models/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('modifiers')
@ObjectType()
export class Modifier {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID del modificador
   */
  id_modifier: number;

  /*
   * Nombre del modificador
   */
  @Column()
  name_modifier: string;

  /*
   *  Estado del modificador
   */
  @Column()
  state_modifier: string;

  /*
   * Opcion del modificador, es opcional(true) o excluyente(false)
   */
  @Column()
  optional_modifier: boolean;

  /*
   * tipo del modificador, A (todos) , C(categoria) , P(producto)
   */
  @Column()
  type_modifier: string;

  /*
   * Codigo del modificador, IDs de la categoria o productos
   */
  @Column()
  code_modifier: string;

  /*
   * Opciones del modificador excluyente, si optional_modifier es (false)
   */
  @Column()
  string_modifier_option: string;

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
    (product: Product) => product.modifiers)

  @JoinColumn({name: 'id_product'})
    product: Product;
}
