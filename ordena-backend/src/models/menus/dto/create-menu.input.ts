import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateMenuInput {
  /*
   * Nombre del cliente
   */
  name_menu: string;

  /*
   *  Estado del menu
   */
  state_menu: boolean;

  /*
   * ID de la sede o sucursal
   */
  id_venue: number;
}
