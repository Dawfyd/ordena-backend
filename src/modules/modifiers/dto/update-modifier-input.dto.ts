import { InputType, PartialType } from '@nestjs/graphql';
import { CreateModifierInput } from './create-modifier-input.dto';

@InputType()
export class UpdateModifierInput extends PartialType(CreateModifierInput) {}
