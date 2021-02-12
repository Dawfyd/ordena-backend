import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMenuInput } from './create-menu-input.dto';

@InputType()
export class UpdateMenuInput extends PartialType(CreateMenuInput) {}
