import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class FindOneSpotInput {
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  @IsNumber()
  @Field(() => Int)
  readonly id: number;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  readonly checkExisting?: boolean;
}
