import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class FindOneAdditionalsPerRequestInput {
  /*
  *ID de la solicitud por aditional
  */
  @IsNumber()
  @Field(() => Int)
  readonly id: number;

  @IsString()
  @Field(() => String)
  readonly companyUuid: string;
}
