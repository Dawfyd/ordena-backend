import { ObjectType, Field} from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Role {
  
  @PrimaryGeneratedColumn()
  @Field()

  /*
  * ID del rol
  */
  id_role: number;

  /*
  * Nombre del rol
  */
  @Column()
  name_role: string;

  /*
  * Estado del rol
  */
  @Column()
  state_role: boolean;
}
