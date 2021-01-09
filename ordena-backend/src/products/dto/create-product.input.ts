import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  
 /*
 * ID de el producto
 */
 id_product: number;

 /*
 * Nombre de el producto
 */
 name_product: string;

 /*
 * Descripcion del producto
 */
 description_product: string;

 /*
 * URL de la imagen del producto
 */
 image_product: string;

 /*
 * Estado del producto 
 */
 state_product: boolean;

 /*
 * Tipo: producto o adicion
 */
 type_product: string;

 /*
 *  Codigo: producto o adicion
 */
 code_product: string;
}
