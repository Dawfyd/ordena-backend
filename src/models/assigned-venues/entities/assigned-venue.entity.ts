import { ObjectType, Field } from '@nestjs/graphql';
import { Person } from 'src/models/persons/entities/person.entity';
import { Venue } from 'src/models/venues/entities/venue.entity';
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity("assigned_Venue")
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

  @JoinColumn({name: 'worker_id'})
  person: Person

  @ManyToOne(
    () => Venue,
    (venue: Venue) => venue.assignedVenues, {
      eager: true,
      cascade: true
    })

  @JoinColumn({name: 'venue_id'})
  venue: Venue

}
