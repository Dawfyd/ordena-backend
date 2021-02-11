import { CreateCustomerAssignedSpotInput } from './create-customer-assigned-spot.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCustomerAssignedSpotInput extends PartialType(CreateCustomerAssignedSpotInput) {
  @Field(() => Int)
  /*
  *ID de la mesa asignada para el cliente
  */
  id: number;
}
