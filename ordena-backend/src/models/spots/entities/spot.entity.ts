import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Venue } from 'src/models/venues/entities/venue.entity';
import { Person } from 'src/models/persons/entities/person.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('spots')
@ObjectType()
export class Spot {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID de la mesa
   */
  id_spot: number;

  /*
   * Estado de la mesa
   */
  @Column()
  state_spot: string;

  /*
   * Nombre de la mesa
   */
  @Column()
  name_spot: string;

  /*
   * Numero de la mesa
   */
  @Column()
  number_spot: number;

  @ManyToOne(
    () => Venue, 
    (venue: Venue) => venue.spots)

  @JoinColumn({name: 'id_venue'})
    venue: Venue;

  @OneToMany(
    (type) => Person, (persons: Person) => persons.spot, {
    eager: true,
    cascade: true,
  })
    persons?: Person[];
}
