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
 * Opcion del modificador 
 */
 optional_modifier: string;

 /*
 * tipo del modificador 
 */
 type_modifier: string;

 /*
 * Codigo del modificador
 */
 code_modifier: string;

 /*
 * Opciones de modificador excluyente 
 */
 string_modifier_option: string;
}
