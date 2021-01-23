import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  /*
   * Nombre del cliente
   */
  name: string;

  /*
   *  Email del cliente
   */
  email: string;

  /*
   * Nit del cliente
   */
  nit: number;

  /*
   * Telefono del cliente
   */
  telephone: number;
}
