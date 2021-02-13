import { ObjectType, Field } from '@nestjs/graphql';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, ManyToOne, JoinColumn, Column } from 'typeorm';

import { Person } from '../../persons/entities/person.entity';
import { Spot } from '../../spots/entities/spot.entity';

@Entity('customer_assigned_spots')
@ObjectType()
export class CustomerAssignedSpot {
 @PrimaryGeneratedColumn()
 @Field()

 /*
 * ID de la mesa asignada para el cliente
 */
 id: number;

 /*
 *fecha y hora cuando la mesa es ocupada
 */
  @Column()
  start: Date;

  /*
 * fecha y hora cuando la mesa es desocupada
 */
  @Column()
  end: Date

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
   (person: Person) => person.customerAssignedSpot, {
     eager: true,
     cascade: true
   })

  @JoinColumn({ name: 'person_id' })
  person: Person;

  @ManyToOne(
    () => Spot,
    (spot: Spot) => spot.customerAssignedSpots, {
      eager: true,
      cascade: true
    })

  @JoinColumn({ name: 'spot_id' })
  spot: Spot;
}
