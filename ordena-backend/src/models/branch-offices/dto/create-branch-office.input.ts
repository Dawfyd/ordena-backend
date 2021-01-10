import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateBranchOfficeInput {
  /*
   * ID de la sede o sucursal
   */
  id_branch_office: number;

  /*
   * Descripcion de la sede o sucursal
   */
  description_branch_office: string;

  /*
   * Ubicacion de la sede o sucursal
   */
  location_branch_office: string;

  /*
   * Ciudad de la sede o sucursal
   */
  city_branch_office: string;

  /*
   * Nombre de la sede o sucursal
   */
  name_branch_office: string;
}
