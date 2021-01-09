import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SpotsService } from './spots.service';
import { Spot } from './entities/spot.entity';
import { CreateSpotInput } from './dto/create-spot.input';
import { UpdateSpotInput } from './dto/update-spot.input';

@Resolver(() => Spot)
export class SpotsResolver {
  constructor(private readonly spotsService: SpotsService) {}

  @Mutation(() => Spot)
  createSpot(@Args('createSpotInput') createSpotInput: CreateSpotInput) {
    return this.spotsService.create(createSpotInput);
  }

  @Query(() => [Spot], { name: 'spots' })
  findAll() {
    return this.spotsService.findAll();
  }

  @Query(() => Spot, { name: 'spot' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.spotsService.findOne(id);
  }

  @Mutation(() => Spot)
  updateSpot(@Args('updateSpotInput') updateSpotInput: UpdateSpotInput) {
    return this.spotsService.update(updateSpotInput.id_spot, updateSpotInput);
  }

  @Mutation(() => Spot)
  removeSpot(@Args('id', { type: () => Int }) id: number) {
    return this.spotsService.remove(id);
  }
}
