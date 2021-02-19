import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateAssignedProductInput {
  /*
   * ID producto padre(Puro)
   */
  @IsNumber()
  @Field(() => Int)
  readonly parentId: number;

  /*
   * ID producto asignado.
   */
  @IsNumber()
  @Field(() => Int)
  readonly assignedId: number;

  /*
   *  company's uuid
   */
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;
}
