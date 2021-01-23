import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  /*
   * Nombre del producto
   */
  name: string;

  /*
   * Descripcion del producto
   */
  description: string;

  /*
   * URL de la imagen del producto
   */
  image: string;

  /*
   * Estado del producto
   */
  state: boolean;

  /*
   * Tipo: producto o adicion
   */
  type: string;

  /*
  * Tipo de producto
  */
  product_type_id: number;
}
