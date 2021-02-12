import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateCustomerAssignedSpotInput {
  /*
  * id de la persona al que pertenece
  */
  person_id: number;

  /*
  * id de la mesa al que pertenece
  */
  spot_id: number;

  /*
  *fecha y hora cuando la mesa es ocupada
  */
  start: Date;

  /*
  * fecha y hora cuando la mesa es desocupada
  */
  end: Date
}
