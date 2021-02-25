import { InputType, PartialType } from '@nestjs/graphql';
import { CreateAdditionalsPerRequestInput } from './create-additionals-per-request.input.dto';

@InputType()
export class UpdateAdditionalsPerRequestInput extends PartialType(CreateAdditionalsPerRequestInput) {}
