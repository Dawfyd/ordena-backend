import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateModifiersPerRequestInput {

  /*
  *Id de la solicitud al que pertenece
  */
  request_id: number;

  /*
  *ID del modificafor al que pertenece
  */
  modifier_id: number;

}
