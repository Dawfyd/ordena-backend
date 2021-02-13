import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class ChangePasswordInput {
    @IsEmail()
    @Field(() => String)
    readonly email: string;

    @IsString()
    @Field(() => String)
    readonly oldPassword: string;

    @IsString()
    @Field(() => String)
    readonly newPassword: string;
}
