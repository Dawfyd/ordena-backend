import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreateModifiersPerRequestInput {
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  /*
  *Id de la solicitud al que pertenece
  */
  @IsInt()
  @Field(() => Int)
  readonly requestId: number;

  /*
  *ID del modificafor al que pertenece
  */
  @IsInt()
  @Field(() => Int)
  readonly modifierId: number;
}
