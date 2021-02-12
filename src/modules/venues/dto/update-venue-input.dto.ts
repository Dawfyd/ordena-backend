import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

import { CreateVenueInput } from './create-venue-input.dto';

@InputType()
export class UpdateVenueInput extends PartialType(CreateVenueInput) {
  /*
   * ID de la sede o sucursal
   */
  @IsNumber()
  @Field(() => Int)
  id: number;
}
