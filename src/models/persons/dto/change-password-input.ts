import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChangePasswordInput {
    @Field()
    readonly email: string;

    @Field()
    readonly oldPassword: string;

    @Field()
    readonly newPassword: string;
}