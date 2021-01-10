import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductsOrderedInput {
  /*
   * ID del producto pedido
   */
  id_product_ordered: number;

  /*
   * Numero de unidades del pedido
   */
  unit_product_ordered: number;

  /*
   * Comentario del pedido
   */
  comentary_product_ordered: string;

  /*
   * Estado del pedido - Servido?
   */
  state_served: boolean;

  /*
   * Asociacion con producto si es una adicion
   */
  addition_product: string;

  /*
   * Modificadores del pedido
   */
  modifier_product: string;

  /*
   *  Estado del pedido - Pagado?
   */
  state_product_paid: boolean;
}
