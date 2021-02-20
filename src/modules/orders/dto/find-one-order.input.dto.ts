import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class FindOneOrderInput {
    @IsNumber()
    @Field(() => Int)
    readonly id: number;

    @IsString()
    @Field(() => String)
    readonly companyUuid: string;
}
