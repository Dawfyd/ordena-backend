import { CreateAssignedProductInput } from './create-assigned-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAssignedProductInput extends PartialType(CreateAssignedProductInput) {
  @Field(() => Int)
  id: number;
}
