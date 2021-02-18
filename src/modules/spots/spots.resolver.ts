import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';

import { Spot } from './entities/spot.entity';
import { Venue } from '../venues/entities/venue.entity';
import { CustomerAssignedSpot } from '../customer-assigned-spots/entities/customer-assigned-spot.entity';
import { WaiterAssignedSpot } from '../waiter-assigned-spots/entities/waiter-assigned-spot.entity';
import { Order } from '../orders/entities/order.entity';
import { Request } from '../requests/entities/request.entity';

import { SpotsService } from './spots.service';
import { SpotsLoaders } from './spots.loaders';

import { CreateSpotInput } from './dto/create-spot-input.dto';
import { UpdateSpotInput } from './dto/update-spot-input.dto';
import { FindAllSpotsInput } from './dto/find-all-spots-input.dto';
import { FindOneSpotInput } from './dto/find-one-spot-input.dto';

@Resolver(() => Spot)
export class SpotsResolver {
  constructor (
    private readonly spotsService: SpotsService,
    private readonly spotsLoaders: SpotsLoaders
  ) {}

  @Mutation(() => Spot, { name: 'createSpot' })
  create (@Args('createSpotInput') createSpotInput: CreateSpotInput): Promise<Spot> {
    return this.spotsService.create(createSpotInput);
  }

  @Query(() => [Spot], { name: 'spots' })
  findAll (@Args('findAllSpotsInput') findAllSpotsInput: FindAllSpotsInput): Promise<Spot[]> {
    return this.spotsService.findAll(findAllSpotsInput);
  }

  @Query(() => Spot, { name: 'spot', nullable: true })
  findOne (@Args('findOneSpotInput') findOneSpotInput: FindOneSpotInput): Promise<Spot> {
    return this.spotsService.findOne(findOneSpotInput);
  }

  @Mutation(() => Spot, { name: 'updateSpot' })
  update (
    @Args('findOneSpotInput') findOneSpotInput: FindOneSpotInput,
    @Args('updateSpotInput') updateSpotInput: UpdateSpotInput
  ): Promise<Spot> {
    return this.spotsService.update(findOneSpotInput, updateSpotInput);
  }

  @Mutation(() => Spot)
  removeSpot (@Args('findOneSpotInput') findOneSpotInput: FindOneSpotInput): Promise<Spot> {
    return this.spotsService.remove(findOneSpotInput);
  }

  @ResolveField(() => Venue, { name: 'venue' })
  venue (@Parent() spot: Spot): Promise<Venue> {
    console.log('spot loading a venue', spot);

    const venueValue: any = spot.venue;

    let venueId = venueValue;

    if (typeof venueId !== 'number') venueId = venueValue.id;

    return this.spotsLoaders.batchVenues.load(venueId);
  }

  @ResolveField(() => [CustomerAssignedSpot], { name: 'customerAssignedSpots' })
  async customerAssignedSpots (@Parent() spot: Spot): Promise<CustomerAssignedSpot[]> {
    return this.spotsService.customerAssignedSpots(spot);
  }

  @ResolveField(() => [WaiterAssignedSpot], { name: 'waiterAssignedSpots' })
  async waiterAssignedSpots (@Parent() spot: Spot): Promise<WaiterAssignedSpot[]> {
    return this.spotsService.waiterAssignedSpots(spot);
  }

  @ResolveField(() => [Order], { name: 'orders' })
  async orders (@Parent() spot: Spot): Promise<Order[]> {
    return this.spotsService.orders(spot);
  }

  @ResolveField(() => [Request], { name: 'requests' })
  async requests (@Parent() spot: Spot): Promise<Request[]> {
    return this.spotsService.requests(spot);
  }
}
