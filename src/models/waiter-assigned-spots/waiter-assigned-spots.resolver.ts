import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WaiterAssignedSpotsService } from './waiter-assigned-spots.service';
import { WaiterAssignedSpot } from './entities/waiter-assigned-spot.entity';
import { CreateWaiterAssignedSpotInput } from './dto/create-waiter-assigned-spot.input';
import { UpdateWaiterAssignedSpotInput } from './dto/update-waiter-assigned-spot.input';

@Resolver(() => WaiterAssignedSpot)
export class WaiterAssignedSpotsResolver {
  constructor(private readonly waiterAssignedSpotsService: WaiterAssignedSpotsService) {}

  @Mutation(() => WaiterAssignedSpot)
  createWaiterAssignedSpot(@Args('createWaiterAssignedSpotInput') createWaiterAssignedSpotInput: CreateWaiterAssignedSpotInput) {
    return this.waiterAssignedSpotsService.create(createWaiterAssignedSpotInput);
  }

  @Query(() => [WaiterAssignedSpot], { name: 'waiterAssignedSpots' })
  findAll() {
    return this.waiterAssignedSpotsService.findAll();
  }

  @Query(() => WaiterAssignedSpot, { name: 'waiterAssignedSpot' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.waiterAssignedSpotsService.findOne(id);
  }

  @Mutation(() => WaiterAssignedSpot)
  updateWaiterAssignedSpot(@Args('updateWaiterAssignedSpotInput') updateWaiterAssignedSpotInput: UpdateWaiterAssignedSpotInput) {
    return this.waiterAssignedSpotsService.update(updateWaiterAssignedSpotInput.id, updateWaiterAssignedSpotInput);
  }

  @Mutation(() => WaiterAssignedSpot)
  removeWaiterAssignedSpot(@Args('id', { type: () => Int }) id: number) {
    return this.waiterAssignedSpotsService.remove(id);
  }
}
