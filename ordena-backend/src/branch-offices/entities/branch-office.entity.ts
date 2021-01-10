import { ObjectType, Field} from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('branch_offices')
@ObjectType()
export class BranchOffice {
  @PrimaryGeneratedColumn()
  @Field()

  /*
  * ID de la sede o sucursal
  */
  id_branch_office: number;

  /*
  * Descripcion de la sede o sucursal
  */
  @Column()
  description_branch_office: string;

  /*
  * Ubicacion de la sede o sucursal
  */
  @Column()
  location_branch_office: string;

  /*
  * Ciudad de la sede o sucursal
  */
  @Column()
  city_branch_office: string;

  /*
  * Nombre de la sede o sucursal
  */
  @Column()
  name_branch_office: string;

  
}
