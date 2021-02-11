import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateRequestInput {
  /*
   * Numero de unidades del solicitado
   */
  unit: number;

  /*
   * Comentario del solicitado
   */
  comentary?: string;
  /*
   * Asociacion con producto si es una adicion
   */
  addition: string;

  /*
   * Modificadores del solicitado
   */
  modifier: string;

  /*
  *ID del producto al que pertenece
  */
  product_id: number;

  /*
  *ID del pedido al que pertenece
  */
  order_id: number;

  /*
  *ID del mesa al que pertenence
  */
  spot_id: number;

  /*
  *ID del  estado de la solicitud
  */
  request_status_id: number
}
