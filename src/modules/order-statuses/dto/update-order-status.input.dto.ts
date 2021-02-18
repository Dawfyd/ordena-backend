import { InputType, PartialType } from '@nestjs/graphql';
import { CreateOrderStatusInput } from './create-order-status.input.dto';

@InputType()
export class UpdateOrderStatusInput extends PartialType(CreateOrderStatusInput) {}
