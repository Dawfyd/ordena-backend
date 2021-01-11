import { ObjectType, Field } from '@nestjs/graphql';
import { Favorite } from 'src/models/favorites/entities/favorite.entity';
import { Order } from 'src/models/orders/entities/order.entity';
import { RolesPerson } from 'src/models/roles-persons/entities/roles-person.entity';
import { Spot } from 'src/models/spots/entities/spot.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('persons')
@ObjectType()
export class Person {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID de la persona
   */
  id_person: number;

  /*
   * Nombre de usuario de la persona
   */
  @Column()
  username: string;

  /*
   * Contraseña de la persona
   */
  @Column()
  password: string;

  /*
   * Numero de celular de la persona
   */
  @Column()
  phone_person: number;

  /*
   * Correo electronico de la persona
   */
  @Column()
  email_person: string;

  /*
   * URL de la foto de perfil de la persona
   */
  @Column()
  photo_person: string;

  @ManyToOne(
    () => Spot, 
    (spot: Spot) => spot.persons)

  @JoinColumn({name: 'id_spot'})
    spot: Spot;

  @OneToMany(
    (type) => Order, (orders: Order) => orders.person, {
    eager: true,
    cascade: true,
  })
    orders?: Order[];

  @OneToMany(
    (type) => Favorite, (favorites: Favorite) => favorites.person, {
    eager: true,
    cascade: true,
  })
    favorites?: Favorite[];

  @OneToMany(
    (type) => RolesPerson, (roles_person: RolesPerson) => roles_person.person, {
    eager: true,
    cascade: true,
  })
    roles_person?: RolesPerson[];

}
