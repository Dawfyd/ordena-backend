import { IsInt, IsString } from 'class-validator';

export class CheckRoleInput {
  @IsString()
  readonly roleCode: string;

  @IsInt()
  readonly id: number;
}
