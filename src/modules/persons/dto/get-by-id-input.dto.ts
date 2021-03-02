import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';

@InputType()
export class GetByIdInput {
  @IsInt()
  @Field(() => Int)
  readonly id: number;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  readonly checkExisting?: boolean;
}
