import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateWaiterAssignedSpotInput } from './create-waiter-assigned-spot.input';

@InputType()
export class UpdateWaiterAssignedSpotInput extends PartialType(CreateWaiterAssignedSpotInput) {
  @Field(() => Int)
  /*
  *ID de la mesa asignada para el cliente
  */
 id: number;
}
