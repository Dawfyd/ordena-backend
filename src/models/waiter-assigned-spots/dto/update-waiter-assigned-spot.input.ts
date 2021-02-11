import { CreateWaiterAssignedSpotInput } from './create-waiter-assigned-spot.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWaiterAssignedSpotInput extends PartialType(CreateWaiterAssignedSpotInput) {
  @Field(() => Int)
  /*
  *ID de la mesa asignada para el cliente
  */
 id: number;
}
