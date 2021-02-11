import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateAdditionalsPerRequestInput {

  /*
  *ID del producto al que pertenece
  */
  product_id: number;

  /*
  *ID de la solicitud al que pertenece
  */
  request_id: number;
}
