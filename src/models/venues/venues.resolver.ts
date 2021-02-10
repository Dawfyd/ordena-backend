import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { VenuesService } from './venues.service';
import { Venue } from './entities/venue.entity';
import { CreateVenueInput } from './dto/create-venue.input';
import { UpdateVenueInput } from './dto/update-venue.input';
import { MenusService } from '../menus/menus.service';
import { SpotsService } from '../spots/spots.service';
import { AssignedVenuesService } from '../assigned-venues/assigned-venues.service';

@Resolver(() => Venue)
export class VenuesResolver {
  constructor(private readonly VenuesService: VenuesService,
              private readonly menusServices: MenusService,
              private readonly spotsService: SpotsService,
              private readonly assignedVenuesService: AssignedVenuesService
              ) {}

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
      updateVenueInput.id,
      updateVenueInput,
    );
  }

  @Mutation(() => Venue)
  removeVenue(@Args('id', { type: () => Int }) id: number) {
    return this.VenuesService.remove(id);
  }

  @ResolveField()
  async menus(@Parent() venue: Venue) {
    const { id } = venue;
    return this.menusServices.findMenus(id);
  }

  @ResolveField()
  async spots(@Parent() venue: Venue) {
    const { id } = venue;
    return this.spotsService.findSpost(id);
  }

  @ResolveField()
  async assignedVenues(@Parent() venue: Venue) {
    const { id } = venue;
    return this.assignedVenuesService.findVenueAssignedVenue(id);
  }
}
