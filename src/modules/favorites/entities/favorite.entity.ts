import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Person } from '../../persons/entities/person.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('favorites')
@ObjectType()
export class Favorite {
  @PrimaryGeneratedColumn()
  @Field()

  /*
   * ID del producto favorito
   */
  id: number;

  /*
   * Estado del producto favorito
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
    () => Product,
    (product: Product) => product.favorites,  {
      eager: true,
      cascade: true
    })

  @JoinColumn({name: 'product_id'})
  product: Product;

  @ManyToOne(
    () => Person,
    (person: Person) => person.favorites, {
      eager: true,
      cascade: true
    })

  @JoinColumn({name: 'person_id'})
    person: Person;
}
