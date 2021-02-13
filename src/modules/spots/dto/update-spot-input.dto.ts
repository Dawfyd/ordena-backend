import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSpotInput } from './create-spot-input.dto';

@InputType()
export class UpdateSpotInput extends PartialType(CreateSpotInput) {}
