import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { SpotsService } from './spots.service';
import { Spot } from './entities/spot.entity';
import { CreateSpotInput } from './dto/create-spot.input';
import { UpdateSpotInput } from './dto/update-spot.input';
import { CustomerAssignedSpotsService } from '../customer-assigned-spots/customer-assigned-spots.service';
import { OrdersService } from '../orders/orders.service';
import { RequestsService } from '../requests/requests.service';

@Resolver(() => Spot)
export class SpotsResolver {
  constructor (private readonly spotsService: SpotsService,
    private readonly customerAssignedSpotsService: CustomerAssignedSpotsService,
    private readonly ordersService: OrdersService,
    private readonly requestsService: RequestsService) {}

  @Mutation(() => Spot)
  createSpot (@Args('createSpotInput') createSpotInput: CreateSpotInput) {
    return this.spotsService.create(createSpotInput);
  }

  @Query(() => [Spot], { name: 'spots' })
  findAll () {
    return this.spotsService.findAll();
  }

  @Query(() => Spot, { name: 'spot' })
  findOne (@Args('id', { type: () => Int }) id: number) {
    return this.spotsService.findOne(id);
  }

  @Mutation(() => Spot)
  updateSpot (@Args('updateSpotInput') updateSpotInput: UpdateSpotInput) {
    return this.spotsService.update(updateSpotInput.id, updateSpotInput);
  }

  @Mutation(() => Spot)
  removeSpot (@Args('id', { type: () => Int }) id: number) {
    return this.spotsService.remove(id);
  }

  @ResolveField()
  async customerAssignedSpot (@Parent() Spot: Spot) {
    const { id } = Spot;
    return this.customerAssignedSpotsService.findSpotCustomerAssignedPost(id);
  }

  @ResolveField()
  async orders (@Parent() Spot: Spot) {
    const { id } = Spot;
    return this.ordersService.findSpotOrder(id);
  }

  @ResolveField()
  async requests (@Parent() Spot: Spot) {
    const { id } = Spot;
    return this.requestsService.findSpotRequest(id);
  }
}
