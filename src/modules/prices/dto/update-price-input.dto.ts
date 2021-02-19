import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePriceInput } from './create-price-input.dto';

@InputType()
export class UpdatePriceInput extends PartialType(CreatePriceInput) {}
