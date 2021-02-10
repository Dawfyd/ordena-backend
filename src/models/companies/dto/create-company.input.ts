import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateCompanyInput {
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
   * Numero de celular  del cliente
   */
  phone: number;
}
