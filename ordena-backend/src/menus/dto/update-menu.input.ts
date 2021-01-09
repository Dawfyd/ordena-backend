import { CreateMenuInput } from './create-menu.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMenuInput extends PartialType(CreateMenuInput) {
  @Field(() => Int)
  /*
  * ID del menu
  */
  id_menu: number;

  /*
  * Nombre del cliente
  */
  name_menu: string;

  /*
  *  Estado del menu
  */
  state_menu: boolean;
}
