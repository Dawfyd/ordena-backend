import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
