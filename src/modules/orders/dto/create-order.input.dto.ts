import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateOrderInput {
    /*
    *Valor de la orden
    */
    @IsNumber()
    @Field(() => Float)
    price: number;

    /*
    *companyUuid de la compañia
    */
    @IsString()
    @Field(() => String)
    readonly companyUuid: string;

    /*
    *authUid de la persona
    */
    @IsString()
    @Field(() => String)
    readonly authUid: string;

    /*
    *ID de la persona
    */
    @IsNumber()
    @Field(() => Int)
    personId: number;

    /*
    *ID de la mesa
    */
    @IsNumber()
    @Field(() => Int)
    spotId: number;

    /*
    *ID del estado del pedido
    */
    @IsNumber()
    @Field(() => Int)
    orderStatusId: number;
}
