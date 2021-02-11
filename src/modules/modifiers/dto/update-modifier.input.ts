import { CreateModifierInput } from './create-modifier.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateModifierInput extends PartialType(CreateModifierInput) {
  @Field(() => Int)

  /*
   * ID del modificador
   */
  id: number;
}
