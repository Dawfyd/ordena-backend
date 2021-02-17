import { ObjectType, Field } from '@nestjs/graphql';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, ManyToOne, JoinColumn, Column } from 'typeorm';

import { Person } from '../../persons/entities/person.entity';
import { Spot } from '../../spots/entities/spot.entity';

@Entity('customer_assigned_spots')
@ObjectType()
export class CustomerAssignedSpot {
  /*
  * ID de la mesa asignada para el cliente
  */
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  /*
  *fecha y hora cuando la mesa es ocupada
  */
  @Column({ type: 'timestamp' })
  start: Date;

  /*
  * fecha y hora cuando la mesa es desocupada
  */
  @Column({ type: 'timestamp' })
  end: Date

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

  @ManyToOne(type => Person, (person: Person) => person.customerAssignedSpot)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @ManyToOne(type => Spot, (spot: Spot) => spot.customerAssignedSpots)
  @JoinColumn({ name: 'spot_id' })
  spot: Spot;
}
