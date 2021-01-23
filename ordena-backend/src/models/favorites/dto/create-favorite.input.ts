import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateFavoriteInput {
  /*
   * Estado del producto favorito
   */
  state: boolean;

  /*
  * ID del producto al que pertenece
  */
  product_id: number;

  /*
  * ID de la perosna al que pertenece
  */
  person_id: number;
}
