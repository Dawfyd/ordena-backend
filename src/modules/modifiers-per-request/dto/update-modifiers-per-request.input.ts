import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateModifiersPerRequestInput } from './create-modifiers-per-request.input';

@InputType()
export class UpdateModifiersPerRequestInput extends PartialType(CreateModifiersPerRequestInput) {
  @Field(() => Int)

  /*
  *ID de la solicitud por modificador
  */
  id: number;
}
