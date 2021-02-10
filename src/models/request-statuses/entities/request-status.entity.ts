import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Request } from 'src/models/requests/entities/request.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('request_Statuses')
@ObjectType()
export class RequestStatus {
  @PrimaryGeneratedColumn()
  @Field()

  /*
  *ID del estado de la solicitud
  */
  id:  number;

  /*
  *nombre del estado de la solicitud
  */
  @Column()
  name: string;

  @OneToMany(
    (type) => Request, (request: Request) => request.requestStatus)
    requests?: Request[];
}
