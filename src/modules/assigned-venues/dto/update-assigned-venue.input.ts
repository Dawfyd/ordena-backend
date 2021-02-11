import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateAssignedVenueInput } from './create-assigned-venue.input';

@InputType()
export class UpdateAssignedVenueInput extends PartialType(CreateAssignedVenueInput) {
  @Field(() => Int)

  /*
  *ID de la sede asignada
  */
  id: number;
}
