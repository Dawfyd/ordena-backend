import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';

import { CustomerAssignedSpot } from './entities/customer-assigned-spot.entity';
import { Person } from '../persons/entities/person.entity';
import { Spot } from '../spots/entities/spot.entity';

import { CustomerAssignedSpotsService } from './customer-assigned-spots.service';
import { CustomerAssignedSpotsLoaders } from './customer-assigned-spots.loaders';

import { CreateCustomerAssignedSpotInput } from './dto/create-customer-assigned-spot-input.dto';
import { UpdateCustomerAssignedSpotInput } from './dto/update-customer-assigned-spot-input.dto';
import { FindAllCustomerAssignedSpotsInput } from './dto/find-all-customer-assigned-spots-input.dto';
import { FindOneCustomerAssignedSpotInput } from './dto/find-one-customer-assigned-spot-input.dto';
import { StartCustomerAssignedSpotInput } from './dto/start-customer-assigned-spot.input.dto';
import { GetCurrentCustomerAssignedSpotInput } from './dto/get-current-customer-assigned-spot-input.dto';

@Resolver(() => CustomerAssignedSpot)
export class CustomerAssignedSpotsResolver {
  constructor (
    private readonly customerAssignedSpotsService: CustomerAssignedSpotsService,
    private readonly customerAssignedSpotsLoaders: CustomerAssignedSpotsLoaders
  ) {}

  @Mutation(() => CustomerAssignedSpot, { name: 'createCustomerAssignedSpot' })
  create (
    @Args('createCustomerAssignedSpotInput') createCustomerAssignedSpotInput: CreateCustomerAssignedSpotInput
  ): Promise<CustomerAssignedSpot> {
    return this.customerAssignedSpotsService.create(createCustomerAssignedSpotInput);
  }

  @Query(() => [CustomerAssignedSpot], { name: 'customerAssignedSpots' })
  findAll (
    @Args('findAllCustomerAssignedSpotsInput') findAllCustomerAssignedSpotsInput: FindAllCustomerAssignedSpotsInput
  ): Promise<CustomerAssignedSpot[]> {
    return this.customerAssignedSpotsService.findAll(findAllCustomerAssignedSpotsInput);
  }

  @Query(() => CustomerAssignedSpot, { name: 'customerAssignedSpot', nullable: true })
  findOne (
    @Args('findOneCustomerAssignedSpotInput') findOneCustomerAssignedSpotInput: FindOneCustomerAssignedSpotInput
  ): Promise<CustomerAssignedSpot> {
    return this.customerAssignedSpotsService.findOne(findOneCustomerAssignedSpotInput);
  }

  @Mutation(() => CustomerAssignedSpot, { name: 'updateCustomerAssignedSpot' })
  updateCustomerAssignedSpot (
    @Args('findOneCustomerAssignedSpotInput') findOneCustomerAssignedSpotInput: FindOneCustomerAssignedSpotInput,
    @Args('updateCustomerAssignedSpotInput') updateCustomerAssignedSpotInput: UpdateCustomerAssignedSpotInput
  ): Promise<CustomerAssignedSpot> {
    return this.customerAssignedSpotsService.update(findOneCustomerAssignedSpotInput, updateCustomerAssignedSpotInput);
  }

  @Mutation(() => CustomerAssignedSpot)
  removeCustomerAssignedSpot (
    @Args('findOneCustomerAssignedSpotInput') findOneCustomerAssignedSpotInput: FindOneCustomerAssignedSpotInput
  ): Promise<CustomerAssignedSpot> {
    return this.customerAssignedSpotsService.remove(findOneCustomerAssignedSpotInput);
  }

  @ResolveField(() => Person, { name: 'person' })
  person (@Parent() customerAssignedSpot: CustomerAssignedSpot): Promise<Person> {
    const value: any = customerAssignedSpot.person;

    let id = value;

    if (typeof id !== 'number') id = value.id;

    return this.customerAssignedSpotsLoaders.batchPersons.load(id);
  }

  @ResolveField(() => Spot, { name: 'spot' })
  spot (@Parent() customerAssignedSpot: CustomerAssignedSpot): Promise<Spot> {
    const value: any = customerAssignedSpot.spot;

    let id = value;

    if (typeof id !== 'number') id = value.id;

    return this.customerAssignedSpotsLoaders.batchSpots.load(id);
  }

  @Mutation(() => CustomerAssignedSpot, { name: 'startCustomerAssignedSpot' })
  start (
    @Args('startCustomerAssignedSpotInput') startCustomerAssignedSpotInput: StartCustomerAssignedSpotInput
  ): Promise<CustomerAssignedSpot> {
    return this.customerAssignedSpotsService.start(startCustomerAssignedSpotInput);
  }

  @Query(() => CustomerAssignedSpot, { name: 'getCurrentCustomerAssignedSpot', nullable: true })
  getCurrent (
    @Args('getCurrentCustomerAssignedSpotInput') getCurrentCustomerAssignedSpotInput: GetCurrentCustomerAssignedSpotInput
  ): Promise<CustomerAssignedSpot | null> {
    return this.customerAssignedSpotsService.getCurrent(getCurrentCustomerAssignedSpotInput);
  }

  @Mutation(() => CustomerAssignedSpot, { name: 'endCustomerAssignedSpot' })
  end (
    @Args('findOneCustomerAssignedSpotInput') findOneCustomerAssignedSpotInput: FindOneCustomerAssignedSpotInput
  ): Promise<CustomerAssignedSpot> {
    return this.customerAssignedSpotsService.end(findOneCustomerAssignedSpotInput);
  }
}
