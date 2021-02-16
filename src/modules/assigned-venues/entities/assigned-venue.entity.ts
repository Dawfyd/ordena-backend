import { ObjectType, Field } from '@nestjs/graphql';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Person } from '../../persons/entities/person.entity';
import { Venue } from '../../venues/entities/venue.entity';

@Entity('assigned_venue')
@ObjectType()
export class AssignedVenue {
  /*
  *ID de la sede asignada
  */
  @Field()
  @PrimaryGeneratedColumn()
  id: number

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

  @ManyToOne(type => Person, (person: Person) => person.assignedVenues)
  @JoinColumn({ name: 'worker_id' })
  person: Person

  @ManyToOne(type => Venue, (venue: Venue) => venue.assignedVenues)
  @JoinColumn({ name: 'venue_id' })
  venue: Venue
}
