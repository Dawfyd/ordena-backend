import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNumberString, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateSpotInput {
  /*
   * Nombre de la mesa
   */
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly name?: string;

  /*
   * Estado de la mesa
   */
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly state?: string;

  /*
   * Numero de la mesa
   */
  @IsNumberString()
  @Field(() => String)
  readonly spotNumber: string;

  /*
   * company's uuid
   */
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  /*
  * venue's id
  */
 @IsInt()
 @Field(() => Int)
 readonly venueId: number;
}
