import { CreateServiceInput } from './create-service.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateServiceInput extends PartialType(CreateServiceInput) {
  @Field(() => Int)
   /*
   * ID de servicio / mesero
   */
  id_service: number;

  /*
   * Alias de servicio / mesero
   */
  alias_service: string;
}
