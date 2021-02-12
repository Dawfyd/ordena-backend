import { ObjectType, Field } from '@nestjs/graphql';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Person } from '../../persons/entities/person.entity';
import { Venue } from '../../venues/entities/venue.entity';

@Entity('assigned_venue')
@ObjectType()
export class AssignedVenue {
  @PrimaryGeneratedColumn()
  @Field()

  /*
  *ID de la sede asignada
  */
  id: number

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
    () => Person,
    (person: Person) => person.assignedVenues, {
      eager: true,
      cascade: true
    })

  @JoinColumn({ name: 'worker_id' })
  person: Person

  @ManyToOne(
    () => Venue,
    (venue: Venue) => venue.assignedVenues, {
      eager: true,
      cascade: true
    })

  @JoinColumn({ name: 'venue_id' })
  venue: Venue
}
