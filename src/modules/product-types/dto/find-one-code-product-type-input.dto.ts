import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class FindOneCodeProductTypeInput {
    @IsString()
    @Length(3, 5)
    @Field(() => String)
    readonly code: string;
}
