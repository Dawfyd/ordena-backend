import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { VenuesService } from './venues.service';
import { Venue } from './entities/venue.entity';
import { CreateVenueInput } from './dto/create-venue.input';
import { UpdateVenueInput } from './dto/update-venue.input';
import { Customer } from '../customers/entities/customer.entity';
import { CustomersService } from '../customers/customers.service';

@Resolver(() => Venue)
export class VenuesResolver {
  constructor(private readonly VenuesService: VenuesService,
    private readonly customersService: CustomersService) {}

  @Mutation(() => Venue)
  createVenue(
    @Args('createVenueInput')
    createVenueInput: CreateVenueInput,
  ) {
    return this.VenuesService.create(createVenueInput);
  }

  @Query(() => [Venue], { name: 'venues' })
  findAll() {
    return this.VenuesService.findAll();
  }

  @Query(() => Venue, { name: 'venue' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.VenuesService.findOne(id);
  }

  @Mutation(() => Venue)
  updateVenue(
    @Args('updateVenueInput')
    updateVenueInput: UpdateVenueInput,
  ) {
    return this.VenuesService.update(
      updateVenueInput.id_venue,
      updateVenueInput,
    );
  }

  @Mutation(() => Venue)
  removeVenue(@Args('id', { type: () => Int }) id: number) {
    return this.VenuesService.remove(id);
  }

  @ResolveField()
  async customer(@Parent() customer: Customer) {
    const { id_customer } = customer;
    return this.customersService.findOne(id_customer);
  }
}
