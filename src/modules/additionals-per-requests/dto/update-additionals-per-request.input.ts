import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateAdditionalsPerRequestInput } from './create-additionals-per-request.input';

@InputType()
export class UpdateAdditionalsPerRequestInput extends PartialType(CreateAdditionalsPerRequestInput) {
  @Field(() => Int)
  /*
  *ID de la solicitud por aditional
  */
  id: number;
}
