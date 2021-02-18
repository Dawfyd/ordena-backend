import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';

import { Product } from '../../products/entities/product.entity';
import { Venue } from '../../venues/entities/venue.entity';

@Entity('products_in_venue')
@Unique('uk_products_in_venue', ['venue', 'product'])
@ObjectType()
export class ProductsInVenue {
  /*
   * ID del producto favorito
   */
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  /*
   * Estado del producto favorito
   */
  @Column({ nullable: true, default: true })
  avaliable?: boolean;

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

  @ManyToOne(type => Product, (product: Product) => product.productsInVenues)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(type => Venue, (venue: Venue) => venue.productsInVenues)
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;
}
