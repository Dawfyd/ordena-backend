import { CreateRoleInput } from './create-role.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field(() => Int)
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
