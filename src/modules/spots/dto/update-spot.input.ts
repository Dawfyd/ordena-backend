import { CreateSpotInput } from './create-spot.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSpotInput extends PartialType(CreateSpotInput) {
  @Field(() => Int)
  /*
   * ID de la mesa
   */
  id: number;
}
