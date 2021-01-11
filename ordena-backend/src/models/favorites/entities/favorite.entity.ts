import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Person } from 'src/models/persons/entities/person.entity';
import { Product } from 'src/models/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
@ObjectType()
export class Favorite {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID del producto favorito
   */
  id_favorites: number;

  /*
   * Estado del producto favorito
   */
  @Column()
  state_favorite: boolean;

  @ManyToOne(
    () => Product, 
    (product: Product) => product.favorites)

  @JoinColumn({name: 'id_product'})
    product: Product;

  @ManyToOne(
    () => Person, 
    (person: Person) => person.favorites)

  @JoinColumn({name: 'id_person'})
    person: Person;
}
