import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateVenueInput {
  /*
   * Nombre de la sede o sucursal
   */
  name: string;

  /*
   * Descripcion de la sede o sucursal
   */
  description: string;

  /*
   * Ubicacion de la sede o sucursal
   */
  location: string;

  /*
   * Ciudad de la sede o sucursal
   */
  city: string;

  /*
   * ID del cliente
   */
  company_id: number;
}
