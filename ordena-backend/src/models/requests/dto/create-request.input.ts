import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRequestInput {
  /*
   * ID del producto solicitado
   */
  id_request: number;

  /*
   * Numero de unidades del solicitado
   */
  unit_request: number;

  /*
   * Comentario del solicitado
   */
  comentary_request: string;

  /*
   * Estado del solicitado - Servido?
   */
  state_served_request: boolean;

  /*
   * Asociacion con producto si es una adicion
   */
  addition_request: string;

  /*
   * Modificadores del solicitado
   */
  modifier_request: string;

  /*
   *  Estado del solicitado - Pagado?
   */
  state_paid_request: boolean;
}
