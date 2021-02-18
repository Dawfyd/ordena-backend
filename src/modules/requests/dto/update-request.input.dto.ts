import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CreateRequestInput } from './create-request.input.dto';

@InputType()
export class UpdateRequestInput extends PartialType(CreateRequestInput) {
    /*
   * ID de la solicitud
   */
    @IsNumber()
    @Field(() => Int)
    id: number;
}
