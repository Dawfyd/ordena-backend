import { InputType, PartialType } from '@nestjs/graphql';

import { CreateInput } from './create-input.dto';

@InputType()
export class UpdateCompanyInput extends PartialType(CreateInput) {}
