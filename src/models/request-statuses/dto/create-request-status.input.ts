import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateRequestStatusInput {

  /*
  *nombre del estado de la solicitud
  */
  name: string;

}
