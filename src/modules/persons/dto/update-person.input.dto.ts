import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePersonInput } from './create-person.input.dto';

@InputType()
export class UpdatePersonInput extends PartialType(CreatePersonInput) {}
