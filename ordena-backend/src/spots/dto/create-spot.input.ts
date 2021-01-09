import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSpotInput {

/*
* ID de la mesa
*/
id_spot: number;

/*
* Estado de la mesa
*/
state_spot: string;

/*
* Nombre de la mesa
*/
name_spot: string;

/*
* Numero de la mesa
*/
number_spot: number;
}
