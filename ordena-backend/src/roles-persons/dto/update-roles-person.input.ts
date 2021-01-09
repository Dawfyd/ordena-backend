import { CreateRolesPersonInput } from './create-roles-person.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRolesPersonInput extends PartialType(CreateRolesPersonInput) {
  @Field(() => Int)
  /*
  * ID de la relacion de rol y persona
  */
  id_role_person: number;

  /*
  * Estado de la relacion de rol y persona
  */
  state_role_person: boolean;
}
