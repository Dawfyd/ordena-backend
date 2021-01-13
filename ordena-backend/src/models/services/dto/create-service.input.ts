import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateServiceInput {
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
