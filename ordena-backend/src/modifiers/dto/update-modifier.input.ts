import { CreateModifierInput } from './create-modifier.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateModifierInput extends PartialType(CreateModifierInput) {
  @Field(() => Int)
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
