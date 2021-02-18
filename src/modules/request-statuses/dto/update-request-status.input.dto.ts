import { InputType, PartialType } from '@nestjs/graphql';
import { CreateRequestStatusInput } from './create-request-status.input.dto';

@InputType()
export class UpdateRequestStatusInput extends PartialType(CreateRequestStatusInput) {
}
