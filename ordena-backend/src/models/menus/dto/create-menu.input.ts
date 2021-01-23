import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateMenuInput {
  /*
   * Nombre del cliente
   */
  name: string;

  /*
   *  Estado del menu
   */
  state: boolean;

  /*
   * ID de la sede o sucursal
   */
  venue_id: number;
}
