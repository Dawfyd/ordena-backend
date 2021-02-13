import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Venue } from '../../venues/entities/venue.entity';

@Entity('companies')
@ObjectType()
export class Company {
  /*
   * ID del cliente
   */
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  /*
   *  UUID del company
   */
  @Column({ type: 'varchar', length: 25, unique: true })
  uuid: string;

  /*
   * Nombre del cliente
   */
  @Column({ type: 'varchar', length: 100 })
  name: string;

  /*
   *  Email del cliente
   */
  @Column({ type: 'varchar', length: 150 })
  email: string;

  /*
   * Nit del cliente
   */
  @Column({ type: 'varchar', length: 15 })
  nit: string;

  /*
   * Numero de celular del cliente
   */
  @Column({ type: 'varchar', length: 10 })
  phone: string;

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

  @OneToMany(type => Venue, (venues: Venue) => venues.company)
  venues: Venue[];
}
