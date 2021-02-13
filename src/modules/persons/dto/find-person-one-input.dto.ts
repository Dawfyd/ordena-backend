import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class FindOnePersonInput {
    @IsString()
    @Field(() => String)
    readonly authUid: string;
}
