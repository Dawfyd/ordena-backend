import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateAssignedProductInput } from './create-assigned-product.input';

@InputType()
export class UpdateAssignedProductInput extends PartialType(CreateAssignedProductInput) {
  @Field(() => Int)
  id: number;
}
