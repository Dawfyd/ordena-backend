import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class FindOneCompanyInput {
    @IsString()
    @Field(() => String)
    readonly companyUuid: string;
}
