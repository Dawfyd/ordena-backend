import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input.dto';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}
