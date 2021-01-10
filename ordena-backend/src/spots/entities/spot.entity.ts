import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('spots')
@ObjectType()
export class Spot {

  @PrimaryGeneratedColumn()
  @Field()

  /*
  * ID de la mesa
  */
  id_spot: number;

    /*
  * Estado de la mesa
  */
 @Column()
 state_spot: string;

  /*
  * Nombre de la mesa
  */
  @Column()
  name_spot: string;

  /*
  * Numero de la mesa
  */
  @Column()
  number_spot: number;
}
