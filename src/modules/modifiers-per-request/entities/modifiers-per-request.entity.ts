import { ObjectType, Field } from '@nestjs/graphql';
import { Modifier } from '../../modifiers/entities/modifier.entity';
import { Request } from '../../requests/entities/request.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('modifiers_per_requests')
@ObjectType()
export class ModifiersPerRequest {
  @PrimaryGeneratedColumn()
  @Field()

  id: number;

  @ManyToOne(
    (type) => Modifier, (modifiers: Modifier) => modifiers.modifiersPerRequests)

    @JoinColumn({name: 'modifier_id'})
    modifier: Modifier;

  @ManyToOne(
    (type) => Request, (requests: Request) => requests.modifiersPerRequests)

    @JoinColumn({name: 'request_id'})
    request: Modifier;
}
