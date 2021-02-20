import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class GetByIdInput {
  @IsInt()
  @Field(() => Int)
  readonly id: number;
}
