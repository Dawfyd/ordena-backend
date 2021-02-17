import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class FindOneFavoriteInput {
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  @IsString()
  @Field(() => String)
  readonly authUid: string;

  @IsNumber()
  @Field(() => Int)
  readonly id: number;
}
