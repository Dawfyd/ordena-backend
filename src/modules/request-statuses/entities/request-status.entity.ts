import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Request } from '../../requests/entities/request.entity';

@Entity('request_statuses')
@ObjectType()
export class RequestStatus {
  @PrimaryGeneratedColumn()
  @Field()

  /*
  *ID del estado de la solicitud
  */
  id: number;

  /*
  *nombre del estado de la solicitud
  */
  @Column()
  name: string;

  @OneToMany(
    (type) => Request, (request: Request) => request.requestStatus)
    requests?: Request[];
}
