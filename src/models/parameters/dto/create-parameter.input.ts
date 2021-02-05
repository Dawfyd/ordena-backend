import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateParameterInput {
  /*
   * Nombre del parametro
   */
  name: string;

  /*
   * Valor del parametro
   */
  value: string;

  /*
   * descripcion del parametro
   */
  description: string;
}
