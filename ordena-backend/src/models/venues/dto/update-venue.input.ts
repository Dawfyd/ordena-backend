import { CreateVenueInput } from './create-venue.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVenueInput extends PartialType(
  CreateVenueInput,
) {
  @Field(() => Int)
  /*
   * ID de la sede o sucursal
   */
  id_venue: number;

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
}
