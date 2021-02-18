import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Request } from '../../requests/entities/request.entity';

@Entity('request_statuses')
@ObjectType()
export class RequestStatus {
  /*
  *ID del estado de la solicitud
  */
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  /*
  *nombre del estado de la solicitud
  */
  @Column({type: 'varchar', length: 45})
  name: string;

  @OneToMany(
    (type) => Request, (request: Request) => request.requestStatus)
    requests?: Request[];
}
