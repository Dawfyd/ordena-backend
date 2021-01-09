import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

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
