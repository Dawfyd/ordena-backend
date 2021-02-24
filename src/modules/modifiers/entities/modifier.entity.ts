import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { ModifiersPerRequest } from '../../modifiers-per-request/entities/modifiers-per-request.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('modifiers')
@ObjectType()
export class Modifier {
  /*
   * ID del modificador
   */
  @PrimaryGeneratedColumn()
  id: number;

  /*
   * Nombre del modificador
   */
  @Field()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  /*
   *  Estado del modificador
   */
  @Column({ type: 'boolean' })
  avaliable: boolean;

  /*
   * Opcion del modificador, es opcional(true) o excluyente(false)
   */
  @Column({ type: 'boolean' })
  optional: boolean;

  // TODO: create the correct table to handle this data modifer_types

  /*
   * tipo del modificador, A (todos) , C(categoria) , P(producto)
   */
  @Column({ name: 'type', length: 1, enum: ['A', 'C', 'P'] })
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

  @ManyToOne(type => Product, (product: Product) => product.modifiers)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(type => ModifiersPerRequest, (modifiersPerRequests: ModifiersPerRequest) => modifiersPerRequests.modifier)
  modifiersPerRequests: ModifiersPerRequest[];
}
