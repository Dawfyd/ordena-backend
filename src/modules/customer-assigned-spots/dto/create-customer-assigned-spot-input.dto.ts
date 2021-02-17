import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDateString, IsInt, IsString } from 'class-validator';

@InputType()
export class CreateCustomerAssignedSpotInput {
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  /*
  * id de la persona al que pertenece
  */
  @IsInt()
  @Field(() => Int)
  readonly personId: number;

  /*
  * id de la mesa al que pertenece
  */
  @IsInt()
  @Field(() => Int)
  readonly spotId: number;

  /*
  *fecha y hora cuando la mesa es ocupada
  */
  @IsDateString()
  @Field(() => Date)
  readonly start: Date;

  /*
  * fecha y hora cuando la mesa es desocupada
  */
  @IsDateString({ strict: true })
  @Field(() => Date)
  readonly end: Date
}
