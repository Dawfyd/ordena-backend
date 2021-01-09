import { ObjectType, Field} from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class RolesPerson {

  @PrimaryGeneratedColumn()
  @Field()

  /*
  * ID de la relacion de rol y persona
  */
  id_role_person: number;

  /*
  * Estado de la relacion de rol y persona
  */
  @Column()
  state_role_person: boolean;
}
