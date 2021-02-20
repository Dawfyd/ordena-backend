import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateRequestStatusInput {
  /*
  *nombre del estado de la solicitud
  */
  @IsString()
  @Field(() => String)
  readonly name: string;
}
