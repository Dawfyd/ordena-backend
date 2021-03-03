import { IsString } from 'class-validator';

export class GetUserAssignedRolesInput {
  @IsString()
  readonly authUid: string;
}
