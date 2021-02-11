import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CustomerAssignedSpotsService } from './customer-assigned-spots.service';
import { CustomerAssignedSpot } from './entities/customer-assigned-spot.entity';
import { CreateCustomerAssignedSpotInput } from './dto/create-customer-assigned-spot.input';
import { UpdateCustomerAssignedSpotInput } from './dto/update-customer-assigned-spot.input';

@Resolver(() => CustomerAssignedSpot)
export class CustomerAssignedSpotsResolver {
  constructor(private readonly customerAssignedSpotsService: CustomerAssignedSpotsService) {}

  @Mutation(() => CustomerAssignedSpot)
  createCustomerAssignedSpot(@Args('createCustomerAssignedSpotInput') createCustomerAssignedSpotInput: CreateCustomerAssignedSpotInput) {
    return this.customerAssignedSpotsService.create(createCustomerAssignedSpotInput);
  }

  @Query(() => [CustomerAssignedSpot], { name: 'customerAssignedSpots' })
  findAll() {
    return this.customerAssignedSpotsService.findAll();
  }

  @Query(() => CustomerAssignedSpot, { name: 'customerAssignedSpot' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.customerAssignedSpotsService.findOne(id);
  }

  @Mutation(() => CustomerAssignedSpot)
  updateCustomerAssignedSpot(@Args('updateCustomerAssignedSpotInput') updateCustomerAssignedSpotInput: UpdateCustomerAssignedSpotInput) {
    return this.customerAssignedSpotsService.update(updateCustomerAssignedSpotInput.id, updateCustomerAssignedSpotInput);
  }

  @Mutation(() => CustomerAssignedSpot)
  removeCustomerAssignedSpot(@Args('id', { type: () => Int }) id: number) {
    return this.customerAssignedSpotsService.remove(id);
  }
}
