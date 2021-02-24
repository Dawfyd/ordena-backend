import { InputType, PartialType } from '@nestjs/graphql';
import { CreateAssignedCategoryInput } from './create-assigned-category-input.dto';

@InputType()
export class UpdateAssignedCategoryInput extends PartialType(CreateAssignedCategoryInput) {}
