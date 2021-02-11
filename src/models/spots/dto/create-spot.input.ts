import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateSpotInput {
  /*
   * Estado de la mesa
   */
  state: string;

  /*
   * Nombre de la mesa
   */
  name: string;

  /*
   * Numero de la mesa
   */
  number: number;

  /*
  *
  */
 venue_id: number;
}
