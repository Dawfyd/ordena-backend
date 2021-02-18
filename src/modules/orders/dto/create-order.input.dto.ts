import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNumber } from 'class-validator';

@InputType()
export class CreateOrderInput {
    /*
    *Valor de la orden
    */
    @IsNumber()
    @Field(() =>Int)
    price: number;

    /*
    *Estado de la orden
    */
    @IsBoolean()
    @Field(() => Boolean)
    state: boolean;

    /*
    *ID de la persona
    */
    @IsNumber()
    @Field(() =>Int)
    person_id: number;

    /*
    *ID de la mesa
    */
    @IsNumber()
    @Field(() =>Int)
    spot_id: number;

    /*
    *ID del estado del pedido
    */
    @IsNumber()
    @Field(() =>Int)
    order_status_id: number;
}
