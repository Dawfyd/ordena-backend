import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendForgottenPasswordEmailInput {
    @Field()
    readonly email: string;
}
