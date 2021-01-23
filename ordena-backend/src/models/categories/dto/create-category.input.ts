import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  /*
   * Descripcion de la sede o sucursal
   */
  name: string;

  /*
   *  Ubicacion de la sede o sucursal
   */
  description: string;

  /*
   * Ciudad de la sede o sucursal
   */
  state: boolean;

  /*
   * ID del menu al que pertenece
   */
  menu_id: number
}
