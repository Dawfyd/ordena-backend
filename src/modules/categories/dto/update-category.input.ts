import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCategoryInput } from './create-category-input.dto';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {}
