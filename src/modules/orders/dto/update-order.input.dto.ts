import { InputType, PartialType } from '@nestjs/graphql';
import { CreateOrderInput } from './create-order.input.dto';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {}
