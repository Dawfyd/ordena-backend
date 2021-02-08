import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRequestInput {
  /*
   * ID del producto solicitado
   */
  id_request?: number;

  /*
   * Numero de unidades del solicitado
   */
  unit_request: number;

  /*
   * Comentario del solicitado
   */
  comentary_request?: string;

  /*
   * Estado del pedido - 1: solicitado - 2: registrado - 3: servido - 4:pagado 
   */
  state_request = 1;

  /*
   * Asociacion con producto si es una adicion
   */
  addition_request: string;

  /*
   * Modificadores del solicitado
   */
  modifier_request: string;

}
