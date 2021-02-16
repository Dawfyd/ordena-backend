import { InputType, PartialType } from '@nestjs/graphql';
import { CreateFavoriteInput } from './create-favorite.input.dto';

@InputType()
export class UpdateFavoriteInput extends PartialType(CreateFavoriteInput) {}
