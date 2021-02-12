import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateSpotInput } from './create-spot.input';

@InputType()
export class UpdateSpotInput extends PartialType(CreateSpotInput) {
  @Field(() => Int)
  /*
   * ID de la mesa
   */
  id: number;
}