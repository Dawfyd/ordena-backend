import { CreateSpotInput } from './create-spot.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSpotInput extends PartialType(CreateSpotInput) {
  @Field(() => Int)
  /*
   * ID de la mesa
   */
  id_spot: number;

  /*
   * Estado de la mesa
   */
  state_spot: string;

  /*
   * Nombre de la mesa
   */
  name_spot: string;

  /*
   * Numero de la mesa
   */
  number_spot: number;
}
