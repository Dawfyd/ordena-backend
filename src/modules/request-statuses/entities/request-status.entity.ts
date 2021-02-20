import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
  @Column({ type: 'varchar', length: 45 })
  name: string;

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

  @OneToMany((type) => Request, (request: Request) => request.requestStatus)
  requests: Request[];
}
