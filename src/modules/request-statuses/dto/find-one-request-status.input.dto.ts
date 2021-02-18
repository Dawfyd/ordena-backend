import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType()
export class FindOneRequestStatusInput {
    /*
    *ID del estado de la solicitud
    */
    @IsNumber()
    @Field(() => Int)
    id: number;
}