import { InputType } from '@nestjs/graphql';
import { Category } from 'src/models/categories/entities/category.entity';

@InputType()
export class CreateMenuInput {
  /*
   * ID del menu
   */
  id_menu?: number;

  /*
   * Nombre del cliente
   */
  name_menu: string;

  /*
   *  Estado del menu
   */
  state_menu: boolean;

  
}
