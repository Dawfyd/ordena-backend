import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateAssignedVenueInput {
  /*
 * ID de la sede al que pertenece
 */
  venue_id: number;

  /*
 * ID de la persona al que pertenece
 */
  worker_id: number;
}
