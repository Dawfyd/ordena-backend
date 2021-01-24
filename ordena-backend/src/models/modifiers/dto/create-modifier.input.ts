import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateModifierInput {

  /*
   * Nombre del modificador
   */
  name: string;

  /*
   *  Estado del modificador
   */
  state: string;

  /*
   * Opcion del modificador, es opcional(true) o excluyente(false)
   */
  optional: boolean;

  /*
   * tipo del modificador, A (todos) , C(categoria) , P(producto)
   */
  type: string;

  /*
   * Codigo del modificador, IDs de la categoria o productos
   */
  code: string;

  /*
   * Opciones del modificador excluyente, si optional_modifier es (false)
   */
  option: number;

  /*
  *id del producto
  */
  product_id: number;
}
