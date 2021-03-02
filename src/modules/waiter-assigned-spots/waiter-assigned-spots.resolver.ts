import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';

import { WaiterAssignedSpot } from './entities/waiter-assigned-spot.entity';
import { Person } from '../persons/entities/person.entity';
import { Spot } from '../spots/entities/spot.entity';

import { WaiterAssignedSpotsService } from './waiter-assigned-spots.service';
import { WaiterAssignedSpotsLoaders } from './waiter-assigned-spots.loaders';

import { CreateWaiterAssignedSpotInput } from './dto/create-waiter-assigned-spot-input.dto';
import { UpdateWaiterAssignedSpotInput } from './dto/update-waiter-assigned-spot-input.dto';
import { FindAllWaiterAssignedSpotsInput } from './dto/find-all-waiter-assigned-spots-input.dto';
import { FindOneWaiterAssignedSpotInput } from './dto/find-one-waiter-assigned-spot-input.dto';
import { StartWaiterAssignedSpotInput } from './dto/start-waiter-assigned-spot-input.dto';
@Resolver(() => WaiterAssignedSpot)
export class WaiterAssignedSpotsResolver {
  constructor (
    private readonly waiterAssignedSpotsService: WaiterAssignedSpotsService,
    private readonly waiterAssignedSpotsLoaders: WaiterAssignedSpotsLoaders
  ) {}

  @Mutation(() => WaiterAssignedSpot, { name: 'createWaiterAssignedSpot' })
  create (
    @Args('createWaiterAssignedSpotInput') createWaiterAssignedSpotInput: CreateWaiterAssignedSpotInput
  ): Promise<WaiterAssignedSpot> {
    return this.waiterAssignedSpotsService.create(createWaiterAssignedSpotInput);
  }

  @Query(() => [WaiterAssignedSpot], { name: 'waiterAssignedSpots' })
  findAll (
    @Args('findAllWaiterAssignedSpotsInput') findAllWaiterAssignedSpotsInput: FindAllWaiterAssignedSpotsInput
  ): Promise<WaiterAssignedSpot[]> {
    return this.waiterAssignedSpotsService.findAll(findAllWaiterAssignedSpotsInput);
  }

  @Query(() => WaiterAssignedSpot, { name: 'waiterAssignedSpot', nullable: true })
  findOne (
    @Args('findOneWaiterAssignedSpotInput') findOneWaiterAssignedSpotInput: FindOneWaiterAssignedSpotInput
  ): Promise<WaiterAssignedSpot> {
    return this.waiterAssignedSpotsService.findOne(findOneWaiterAssignedSpotInput);
  }

  @Mutation(() => WaiterAssignedSpot, { name: 'updateWaiterAssignedSpot' })
  updateWaiterAssignedSpot (
    @Args('findOneWaiterAssignedSpotInput') findOneWaiterAssignedSpotInput: FindOneWaiterAssignedSpotInput,
    @Args('updateCustomerAssignedSpotInput') updateWaiterAssignedSpotInput: UpdateWaiterAssignedSpotInput
  ): Promise<WaiterAssignedSpot> {
    return this.waiterAssignedSpotsService.update(findOneWaiterAssignedSpotInput, updateWaiterAssignedSpotInput);
  }

  @Mutation(() => WaiterAssignedSpot)
  removeWaiterAssignedSpot (
    @Args('findOneWaiterAssignedSpotInput') findOneWaiterAssignedSpotInput: FindOneWaiterAssignedSpotInput
  ): Promise<WaiterAssignedSpot> {
    return this.waiterAssignedSpotsService.remove(findOneWaiterAssignedSpotInput);
  }

  @ResolveField(() => Person, { name: 'person' })
  person (@Parent() waiterAssignedSpot: WaiterAssignedSpot): Promise<Person> {
    const value: any = waiterAssignedSpot.person;

    let id = value;

    if (typeof id !== 'number') id = value.id;

    return this.waiterAssignedSpotsLoaders.batchPersons.load(id);
  }

  @ResolveField(() => Spot, { name: 'spot' })
  spot (@Parent() waiterAssignedSpot: WaiterAssignedSpot): Promise<Spot> {
    const value: any = waiterAssignedSpot.spot;

    let id = value;

    if (typeof id !== 'number') id = value.id;

    return this.waiterAssignedSpotsLoaders.batchSpots.load(id);
  }

  @Mutation(() => WaiterAssignedSpot)
  start (
    @Args('startWaiterAssignedSpotInput') startWaiterAssignedSpotInput: StartWaiterAssignedSpotInput
  ): Promise<WaiterAssignedSpot> {
    return this.waiterAssignedSpotsService.start(startWaiterAssignedSpotInput);
  }
}
