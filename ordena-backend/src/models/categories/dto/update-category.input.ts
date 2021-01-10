import { CreateCategoryInput } from './create-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';


@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => Int)
  /*
   * ID de la categoria
   */
  id_category: number;

  /*
   * Descripcion de la sede o sucursal
   */
  name_category: string;

  /*
   *  Ubicacion de la sede o sucursal
   */
  description_category: string;

  /*
   * Ciudad de la sede o sucursal
   */
  state_category: boolean;

  /*
   * ID del menu al que pertenece
   */
  
}
