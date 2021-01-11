import { ObjectType, Field } from '@nestjs/graphql';
import { Person } from 'src/models/persons/entities/person.entity';
import { ProductsOrdered } from 'src/models/products-ordered/entities/products-ordered.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(
    () => Person, 
    (person: Person) => person.orders)

  @JoinColumn({name: 'id_person'})
    person: Person;

  @OneToMany(
    (type) => ProductsOrdered, (products_ordered: ProductsOrdered) => products_ordered.order, {
    eager: true,
    cascade: true,
  })
    products_ordered?: ProductsOrdered[];

}
