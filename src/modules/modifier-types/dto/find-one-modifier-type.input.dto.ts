import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class FindOneModifierTypeInput {
  /*
  *Id del tipo de modificador
  */
  @IsNumber()
  @Field(() => Int)
  readonly id: number;
}
