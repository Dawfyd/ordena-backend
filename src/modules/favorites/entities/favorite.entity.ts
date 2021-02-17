import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';

import { Person } from '../../persons/entities/person.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('favorites')
@Unique('uk_favorites', ['person', 'product'])
@ObjectType()
export class Favorite {
  /*
   * ID del producto favorito
   */
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  /*
   * Estado del producto favorito
   */
  @Column()
  avaliable: boolean;

  /*
  *fecha cuando se realizo el registro
  */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /*
  *fecha cuando se actualiza el registro
  */
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // relations

  @ManyToOne(type => Product, (product: Product) => product.favorites)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(type => Person, (person: Person) => person.favorites)
  @JoinColumn({ name: 'person_id' })
  person: Person;
}
