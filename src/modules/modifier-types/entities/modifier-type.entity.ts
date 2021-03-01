import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Modifier } from '../../modifiers/entities/modifier.entity';

@Entity('modifier_types')
@ObjectType()
export class ModifierType {
  /*
  *ID del tipo de modificador
  */
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  /*
  *Codigo del tipo de modificador
  */
  @Field()
  @Column({ type: 'varchar', length: 45 })
  code: string;

  /*
  *Nombre del tipo de modificador
  */
  @Field()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(type => Modifier, (modifier: Modifier) => modifier.modifierType)
  modifiers: Modifier[];
}
