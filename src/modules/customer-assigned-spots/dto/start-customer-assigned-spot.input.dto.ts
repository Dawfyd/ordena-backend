import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class StartCustomerAssignedSpotInput {
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  @IsInt()
  @Field(() => Int)
  readonly spotId: number;

  @IsInt()
  @Field(() => Int)
  readonly personId: number;
}
