import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateModifierTypeInput {
  /*
  *Codigo del tipo de modificador
  */
  @IsString()
  @Field(() => String)
  readonly code: string;

  /*
  *Nombre del tipo de modificador
  */
  @IsString()
  @Field(() => String)
  readonly name: string;
}
