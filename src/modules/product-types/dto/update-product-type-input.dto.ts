import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductTypeInput } from './create-product-type-input.dto';

@InputType()
export class UpdateProductTypeInput extends PartialType(CreateProductTypeInput) {}
