import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  /*
   * Descripcion de la sede o sucursal
   */
  name_category: string;

  /*
   *  Ubicacion de la sede o sucursal
   */
  description_category: string;

  /*
   * Ciudad de la sede o sucursal
   */
  state_category: boolean;

  /*
   * ID del menu al que pertenece
   */
  id_menu: number
}
