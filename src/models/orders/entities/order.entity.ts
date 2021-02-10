import { ObjectType, Field } from '@nestjs/graphql';
import { OrderStatus } from 'src/models/order-statuses/entities/order-status.entity';
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
  id: number;

  /*
   * Valor de la orden
   */
  @Column()
  price: number;

  /*
   *  Estado de la orden
   */
  @Column()
  state: boolean;

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
    (person: Person) => person.orders,{
      eager: true,
      cascade: true
    })

  @JoinColumn({name: 'person_id'})
    person: Person;


  @OneToMany(
    (type) => Spot, (spot: Spot) => spot.orders, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({name: 'spot_id'})
  spot: Spot;

    @OneToMany(
      (type) => OrderStatus, (orderStatus: OrderStatus) => orderStatus.orders, {
      eager: true,
      cascade: true
      })

  @JoinColumn({name: 'orderStatus_id'})
  orderStatus: OrderStatus;

  @OneToMany(
    (type) => Request, (requests: Request) => requests.order)
    requests?: Request[];
}
