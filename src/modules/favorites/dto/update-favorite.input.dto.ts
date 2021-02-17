import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean } from 'class-validator';

@InputType()
export class UpdateFavoriteInput {
    /*
   * Estado del producto favorito
   */
    @IsBoolean()
    @Field(() => Boolean)
    readonly avaliable: boolean;
}
