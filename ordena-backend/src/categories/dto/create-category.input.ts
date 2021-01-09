import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  
 /*
 * ID de la categoria
 */
 id_category: number;

 /*
 * Descripcion de la sede o sucursal
 */
 name_category: string;

 /*
 *  Ubicacion de la sede o sucursal
 */
 description_category: string;

 /*
 * Ciudad de la sede o sucursal
 */
 state_category: boolean;
}
