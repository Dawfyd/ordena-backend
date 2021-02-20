import { InputType, PartialType } from '@nestjs/graphql';
import { CreateRequestInput } from './create-request.input.dto';

@InputType()
export class UpdateRequestInput extends PartialType(CreateRequestInput) {}
