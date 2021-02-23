import { InputType, PartialType } from '@nestjs/graphql';
import { CreateModifiersPerRequestInput } from './create-modifiers-per-request-input.dto';

@InputType()
export class UpdateModifiersPerRequestInput extends PartialType(CreateModifiersPerRequestInput) {}
