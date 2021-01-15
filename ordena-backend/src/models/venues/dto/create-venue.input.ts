import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateVenueInput {
  /*
   * Descripcion de la sede o sucursal
   */
  description_venue: string;

  /*
   * Ubicacion de la sede o sucursal
   */
  location_venue: string;

  /*
   * Ciudad de la sede o sucursal
   */
  city_venue: string;

  /*
   * Nombre de la sede o sucursal
   */
  name_venue: string;

  /*
   * ID del cliente
   */
  id_customer: number;
}
