import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class UpdateCategoryPureProductInput {
  /*
   * ID de la categoria
   */
  @IsNumber()
  @Field(() => Int)
  readonly categoryId: number;
}
