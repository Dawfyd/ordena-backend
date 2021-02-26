import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateModifiersPerRequestInput {
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  /*
  *Id de la solicitud al que pertenece
  */
  @IsNumber()
  @Field(() => Int)
  readonly requestId: number;

  /*
  *ID del modificafor al que pertenece
  */
  @IsNumber()
  @Field(() => Int)
  readonly modifierId: number;
}
