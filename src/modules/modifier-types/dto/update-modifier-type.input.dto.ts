import { InputType, PartialType } from '@nestjs/graphql';
import { CreateModifierTypeInput } from './create-modifier-type.input.dto';

@InputType()
export class UpdateModifierTypeInput extends PartialType(CreateModifierTypeInput) {}
