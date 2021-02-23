import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Modifier } from '../../modifiers/entities/modifier.entity';
import { Request } from '../../requests/entities/request.entity';

@Entity('modifiers_per_requests')
@ObjectType()
export class ModifiersPerRequest {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Modifier, (modifiers: Modifier) => modifiers.modifiersPerRequests)
  @JoinColumn({ name: 'modifier_id' })
  modifier: Modifier;

  @ManyToOne((type) => Request, (requests: Request) => requests.modifiersPerRequests)
  @JoinColumn({ name: 'request_id' })
  request: Modifier;
}
