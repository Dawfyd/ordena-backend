import { ObjectType, Field } from '@nestjs/graphql';
import { Person } from 'src/models/persons/entities/person.entity';
import { Request } from 'src/models/requests/entities/request.entity';
import { Spot } from 'src/models/spots/entities/spot.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('orders')
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID de la orden
   */
  id_order: number;

  /*
   * Valor de la orden
   */
  @Column()
  price_order: number;

  /*
   *  Estado de la orden
   */
  @Column()
  state_order: boolean;

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
    () => Spot, 
    (spot: Spot) => spot.orders)

  @JoinColumn({name: 'id_spot'})
  spot: Spot;

  
  @ManyToOne(
    () => Person, 
    (person: Person) => person.orders)

  @JoinColumn({name: 'id_person'})
    person: Person;


  @OneToMany(
    (type) => Request, (requests: Request) => requests.order, {
      eager: true,
      cascade: true
    })
    requests?: Request[];

}
