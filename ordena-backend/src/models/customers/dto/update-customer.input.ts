import { CreateCustomerInput } from './create-customer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
  @Field(() => Int)
  /*
   * ID del cliente
   */
  id_customer: number;

  /*
   * Nombre del cliente
   */
  name_customer: string;

  /*
   *  Email del cliente
   */
  email_customer: string;

  /*
   * Nit del cliente
   */
  nit_customer: number;

  /*
   * Telefono del cliente
   */
  telephone_customer: number;
}
