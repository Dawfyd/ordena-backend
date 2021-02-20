import { InputType, PartialType } from '@nestjs/graphql';
import { CreateAssignedProductInput } from './create-assigned-product-input.dto';

@InputType()
export class UpdateAssignedProductInput extends PartialType(CreateAssignedProductInput) {}
