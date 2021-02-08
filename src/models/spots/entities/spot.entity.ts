import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Venue } from 'src/models/venues/entities/venue.entity';
import { Person } from 'src/models/persons/entities/person.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Order } from 'src/models/orders/entities/order.entity';
import { Request } from 'src/models/requests/entities/request.entity';
import { Service } from 'src/models/services/entities/service.entity';

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
    () => Service,
    (service: Service) => service.spots)

  @JoinColumn({name: 'id_service'})
  service: Service;

  @OneToMany(
    (type) => Order, (orders: Order) => orders.spot)
    orders?: Order[];

  @OneToMany(
    (type) => Request, (requests: Request) => requests.spot)
    requests?: Request[];

  @ManyToOne(
    () => Venue,
    (venue: Venue) => venue.spots)

  @JoinColumn({name: 'id_venue'})
    venue: Venue;

  @OneToMany(
    (type) => Person, (persons: Person) => persons.spot, {
      eager: true,
      cascade: true
    })
    persons?: Person[];

}
