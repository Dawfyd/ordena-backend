import { ObjectType, Field } from '@nestjs/graphql';
import { Venue } from 'src/models/venues/entities/venue.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('companies')
@ObjectType()
export class Company {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID del cliente
   */
  id: number;

  /*
   * Nombre del cliente
   */
  @Column()
  name: string;

  /*
   *  Email del cliente
   */
  @Column()
  email: string;

  /*
   * Nit del cliente
   */
  @Column()
  nit: number;

  /*
   * Numero de celular del cliente
   */
  @Column()
  phone: number;

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

  @OneToMany(
    (type) => Venue, (venues: Venue) => venues.company)
    venues?: Venue[];
}
