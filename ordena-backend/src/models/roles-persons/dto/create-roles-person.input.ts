import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRolesPersonInput {
  /*
   * ID de la relacion de rol y persona
   */
  id_role_person: number;

  /*
   * Estado de la relacion de rol y persona
   */
  state_role_person: boolean;
}
