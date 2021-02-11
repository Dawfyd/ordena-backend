import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateVenueInput } from './create-venue.input';

@InputType()
export class UpdateVenueInput extends PartialType(
  CreateVenueInput
) {
  @Field(() => Int)
  /*
   * ID de la sede o sucursal
   */
  id: number;
}
