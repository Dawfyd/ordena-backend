import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType()
export class FindOneRequestInput {
   @IsNumber()
   @Field(() => Int)
   readonly id: number;
}