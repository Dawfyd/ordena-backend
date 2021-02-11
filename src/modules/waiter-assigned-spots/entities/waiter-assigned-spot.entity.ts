import { ObjectType, Field } from '@nestjs/graphql';
import { Person } from '../../persons/entities/person.entity';
import { Spot } from '../../spots/entities/spot.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('waiter_assigned_spots')
@ObjectType()
export class WaiterAssignedSpot {
  @PrimaryGeneratedColumn()
  @Field()
  /*
 * ID de la mesa asignada para el cliente
 */
 id: number;

  /*
 *fecha y hora cuando la mesa es asignada
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
   (person: Person) => person.waiterAssignedSpots,  {
     eager: true,
     cascade: true
   })

  @JoinColumn({name: 'person_id'})
  person: Person;

  @ManyToOne(
    () => Spot,
    (spot: Spot) => spot.waiterAssignedSpots,  {
      eager: true,
      cascade: true
    })

    @JoinColumn({name: 'spot_id'})
    spot: Spot;
}
