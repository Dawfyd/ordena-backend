import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateModifierInput {
  /*
   * ID del modificador
   */
  id_modifier: number;

  /*
   * Nombre del modificador
   */
  name_modifier: string;

  /*
   *  Estado del modificador
   */
  state_modifier: string;

  /*
   * Opcion del modificador, es opcional(true) o excluyente(false)
   */
  optional_modifier: boolean;

  /*
   * tipo del modificador, A (todos) , C(categoria) , P(producto)
   */
  type_modifier: string;

  /*
   * Codigo del modificador, IDs de la categoria o productos
   */
  code_modifier: string;

  /*
   * Opciones del modificador excluyente, si optional_modifier es (false)
   */
  string_modifier_option: string;
}
