import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class FindAllFavoritesInput {
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  readonly limit?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  readonly skip?: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly search?: string;
}
