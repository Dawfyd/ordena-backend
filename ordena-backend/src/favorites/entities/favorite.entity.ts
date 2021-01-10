import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

}
