import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString } from 'class-validator';

@InputType()
export class CreateModifierInput {
  /*
   * Nombre del modificador
   */
  @IsString()
  @Field(() => String)
  readonly name: string;

  @IsBoolean()
  @Field(() => Boolean)
  readonly avaliable: boolean;

  @IsString()
  @Field(() => String)
  readonly companyUuid: string;

  /*
  *id del producto
  */
  @IsInt()
  @Field(() => Int)
  readonly productId: number;
}
