import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateModifierInput } from './create-modifier.input';

@InputType()
export class UpdateModifierInput extends PartialType(CreateModifierInput) {
  @Field(() => Int)

  /*
   * ID del modificador
   */
  id: number;
}
