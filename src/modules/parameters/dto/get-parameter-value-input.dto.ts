import { IsString } from 'class-validator';

export class GetParameterValueInput {
  @IsString()
  readonly name: string;
}
