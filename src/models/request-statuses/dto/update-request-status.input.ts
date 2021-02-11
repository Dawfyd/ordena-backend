import { CreateRequestStatusInput } from './create-request-status.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRequestStatusInput extends PartialType(CreateRequestStatusInput) {
  @Field(() => Int)

  /*
  *ID del estado de la solicitud
  */
  id: number;
}
