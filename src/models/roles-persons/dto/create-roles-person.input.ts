import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateRolesPersonInput {
  /*
   * Estado de la relacion de rol y persona
   */
  state_role_person: boolean;

  /*
   * ID de la persona
   */
  id_person: number;

  /*
   * ID del rol
   */
  id_role: number;
}
