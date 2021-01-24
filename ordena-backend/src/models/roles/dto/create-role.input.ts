import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  /*
   * Nombre del rol
   */
  name_role: string;

  /*
   * Estado del rol
   */
  state_role: boolean;
}
