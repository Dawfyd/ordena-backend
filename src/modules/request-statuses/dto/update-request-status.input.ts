import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateRequestStatusInput } from './create-request-status.input';

@InputType()
export class UpdateRequestStatusInput extends PartialType(CreateRequestStatusInput) {
  @Field(() => Int)

  /*
  *ID del estado de la solicitud
  */
  id: number;
}
