import { InputType, PartialType } from '@nestjs/graphql';
import { CreateWaiterAssignedSpotInput } from './create-waiter-assigned-spot-input.dto';

@InputType()
export class UpdateWaiterAssignedSpotInput extends PartialType(CreateWaiterAssignedSpotInput) {}
