import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Spot } from 'src/models/spots/entities/spot.entity';
import { Venue } from 'src/models/venues/entities/venue.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('services')
@ObjectType()
export class Service {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID del rol
   */
  id_service: number;

  /*
   * Nombre del rol
   */
  @Column()
  alias_service: string;

  @OneToMany(
    (type) => Spot, (spots: Spot) => spots.service, {
    eager: true,
    cascade: true,
  })
  spots?: Spot[];

  @ManyToOne(
    () => Venue,
    (venue: Venue) => venue.services)

  @JoinColumn({name: 'id_venue'})
    venue: Venue;
}
