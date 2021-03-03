import { ObjectType, Field } from '@nestjs/graphql';
import { ModifierType } from 'src/modules/modifier-types/entities/modifier-type.entity';
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
  @Column({ type: 'boolean', default: true })
  avaliable: boolean;

  /*
   * Opcion del modificador, es opcional(true) o excluyente(false)
   */
  @Column({ name: 'can_be_optional', type: 'boolean' })
  canBeOptional: boolean;

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

  @ManyToOne(type => ModifierType, (modifierType: ModifierType) => modifierType.modifiers)
  @JoinColumn({ name: 'modifier_type_id' })
  modifierType: ModifierType;

  @OneToMany(type => ModifiersPerRequest, (modifiersPerRequests: ModifiersPerRequest) => modifiersPerRequests.modifier)
  modifiersPerRequests: ModifiersPerRequest[];
}
