import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class UpdateAssignedVenueInput {
  /*
  * ID de la sede al que pertenece
  */
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  readonly venueId?: number;

  /*
  * ID de la persona al que pertenece
  */
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  readonly workerId?: number;
}
