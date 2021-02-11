import { CreateParameterInput } from './create-parameter.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateParameterInput extends PartialType(CreateParameterInput) {
  /*
   * ID del parametro
   */
  id: number;
}
