import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { ModifiersPerRequest } from '../../modifiers-per-request/entities/modifiers-per-request.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('modifiers')
@ObjectType()
export class Modifier {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID del modificador
   */
  id: number;

  /*
   * Nombre del modificador
   */
  @Column()
  name: string;

  /*
   *  Estado del modificador
   */
  @Column()
  state: string;

  /*
   * Opcion del modificador, es opcional(true) o excluyente(false)
   */
  @Column()
  optional: boolean;

  /*
   * tipo del modificador, A (todos) , C(categoria) , P(producto)
   */
  @Column()
  type: string;

  /*
   * Codigo del modificador, IDs de la categoria o productos
   */
  @Column()
  code: string;

  /*
   * Opciones del modificador excluyente, si optional_modifier es (false)
   */
  @Column()
  option: number;

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
    (product: Product) => product.modifiers, {
      eager: true,
      cascade: true
    })

  @JoinColumn({ name: 'product_id' })
    product: Product;

  @OneToMany(
    (type) => ModifiersPerRequest, (modifiersPerRequests: ModifiersPerRequest) => modifiersPerRequests.modifier)
    modifiersPerRequests?: ModifiersPerRequest[];
}
