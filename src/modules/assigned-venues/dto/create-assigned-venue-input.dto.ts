import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreateAssignedVenueInput {
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  /*
  * ID de la sede al que pertenece
  */
  @IsInt()
  @Field(() => Int)
  readonly venueId: number;

  /*
  * ID de la persona al que pertenece
  */
  @IsInt()
  @Field(() => Int)
  workerId: number;
}
