import { ObjectType, Field } from '@nestjs/graphql';
import { Favorite } from 'src/models/favorites/entities/favorite.entity';
import { Order } from 'src/models/orders/entities/order.entity';
import { Spot } from 'src/models/spots/entities/spot.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('persons')
@ObjectType()
export class Person {
  @PrimaryGeneratedColumn()
  @Field()
  /*
   * ID de la persona
   */
  id: number;

  /*
   * Nombre de usuario de la persona
   */
  @Column()
  username: string;

  /*
   * Numero de celular de la persona
   */
  @Column({ unique: true })
  phone: string;

  /*
   * Correo electronico de la persona
   */
  @Column({ unique: true })
  email: string;

  /*
   * URL de la foto de perfil de la persona
   */
  @Column()
  photo: string;

  /*
   * Identificador unico de la persona asociado con el ACL
   */
  @Column()
  authUid: string

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

  /*
    * ID de la mesa asociada
    */
  @ManyToOne(
    () => Spot,
    (spot: Spot) => spot.persons)

  @JoinColumn({name: 'spot_id'})
    spot: Spot;

  /*
    * Ordenes pedidas por la persona
    */
  @OneToMany(
    (type) => Order, (orders: Order) => orders.person, {
    eager: true,
    cascade: true,
  })

  orders?: Order[];

  /*
    * Productos favoritos seleccionados por la persona
    */
  @OneToMany(
    (type) => Favorite, (favorites: Favorite) => favorites.person)

  favorites?: Favorite[];
}
