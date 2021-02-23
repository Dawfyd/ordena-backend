import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class CreateAssignedCategoryInput {
  /*
   * ID de la categoria al que pertenece
   */
  @IsInt()
  @Field(() => Int)
  readonly categoryId: number;

  /*
   * ID del producto al que pertenece
   */
  @IsInt()
  @Field(() => Int)
  readonly productId: number;

  /*
   *  company's uuid
   */
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;
}
