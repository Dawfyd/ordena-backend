import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('parameters')
@ObjectType()
export class Parameter {
  /*
   * ID del parametro
   */
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  /*
   * Nombre del parametro
   */
  @Column({ type: 'varchar', length: 100 , unique: true})
  name: string;

  /*
   * Valor del parametro
   */
  @Column({ type: 'varchar', length: 200 })
  value: string;

  /*
   * descripcion del parametro
   */
  @Column({ type: 'varchar', length: 300 })
  description: string;

  /*
  *fecha cuando se realizo el registro
  */
  @CreateDateColumn()
  createdAt: Date;

  /*
  *fecha cuando se actualiza el registro
  */
  @UpdateDateColumn()
  updatedAt: Date;
}
