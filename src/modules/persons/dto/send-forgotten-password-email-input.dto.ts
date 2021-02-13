import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class SendForgottenPasswordEmailInput {
    @IsEmail()
    @Field(() => String)
    readonly email: string;
}
