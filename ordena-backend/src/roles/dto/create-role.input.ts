import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  
 /*
 * ID del rol
 */
 id_role: number;

 /*
 * Nombre del rol
 */
 name_role: string;

 /*
 * Estado del rol
 */
 state_role: boolean;
}
