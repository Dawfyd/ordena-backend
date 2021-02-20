import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';

import { Product } from '../../products/entities/product.entity';
import { Venue } from '../../venues/entities/venue.entity';

@ObjectType()
@Entity('prices')
@Unique('uk_prices', ['product', 'venue'])
export class Price {
  /*
   * ID del precio
   */
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  /*
   * Valor o precio
   */
  @Column({ type: 'decimal', precision: 12, scale: 2 })
  value: number;

  /*
   * Moneda del precio
   */
  @Column({ type: 'varchar', length: 5 })
  currency: string;

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

  @ManyToOne(type => Product, product => product.prices)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(type => Venue, venue => venue.prices)
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;
}
