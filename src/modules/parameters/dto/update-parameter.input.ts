import { InputType, PartialType } from '@nestjs/graphql';
import { CreateParameterInput } from './create-parameter.input';

@InputType()
export class UpdateParameterInput extends PartialType(CreateParameterInput) {
  /*
   * ID del parametro
   */
  id: number;
}
