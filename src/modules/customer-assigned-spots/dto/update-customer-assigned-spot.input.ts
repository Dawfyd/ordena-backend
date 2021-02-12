import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateCustomerAssignedSpotInput } from './create-customer-assigned-spot.input';

@InputType()
export class UpdateCustomerAssignedSpotInput extends PartialType(CreateCustomerAssignedSpotInput) {
  @Field(() => Int)
  /*
  *ID de la mesa asignada para el cliente
  */
  id: number;
}
