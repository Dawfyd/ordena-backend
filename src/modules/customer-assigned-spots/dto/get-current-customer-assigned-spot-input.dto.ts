import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class GetCurrentCustomerAssignedSpotInput {
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  @IsInt()
  @Field(() => Int)
  readonly personId: number;
}
