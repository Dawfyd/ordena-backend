import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFavoriteInput {
 /*
 * ID del producto favorito
 */
 id_favorites: number;

 /*
 * Estado del producto favorito
 */
 state_favorite: boolean;
}
