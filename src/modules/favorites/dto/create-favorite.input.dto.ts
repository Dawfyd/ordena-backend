import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateFavoriteInput {
  /*
   * Estado del producto favorito
   */
  @IsBoolean()
  @Field(() => Boolean)
  readonly state: boolean;

  /*
  * ID del producto al que pertenece
  */
  @IsNumber()
  @Field(() => Int)
  readonly productId: number;

  /*
  * person authUid
  */
  @IsString()
  @Field(() => String)
  readonly authUid: string;

  /*
   *  company's uuid
   */
  @IsString()
  @Field(() => String)
  readonly companyUuid: string;
}
