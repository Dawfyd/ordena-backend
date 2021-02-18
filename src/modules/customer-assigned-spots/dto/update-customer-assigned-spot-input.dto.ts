import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCustomerAssignedSpotInput } from './create-customer-assigned-spot-input.dto';

@InputType()
export class UpdateCustomerAssignedSpotInput extends PartialType(CreateCustomerAssignedSpotInput) {}
