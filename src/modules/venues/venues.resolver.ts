import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { Venue } from './entities/venue.entity';
import { Menu } from '../menus/entities/menu.entity';
import { Spot } from '../spots/entities/spot.entity';
import { AssignedVenue } from '../assigned-venues/entities/assigned-venue.entity';

import { VenuesService } from './venues.service';
import { VenuesLoaders } from './venues.loaders';

import { CreateVenueInput } from './dto/create-venue-input.dto';
import { UpdateVenueInput } from './dto/update-venue-input.dto';
import { FindAllVenuesInput } from './dto/find-all-venues-input.dto';
import { FindOneVenueInput } from './dto/find-one-venue-input.dto';
import { Company } from '../companies/entities/company.entity';

@Resolver(Venue)
export class VenuesResolver {
  constructor (
    private readonly service: VenuesService,
    private readonly venuesLoaders: VenuesLoaders
  ) {}

  @Mutation(() => Venue, { name: 'createVenue' })
  create (@Args('createVenueInput') createVenueInput: CreateVenueInput): Promise<Venue> {
    return this.service.create(createVenueInput);
  }

  @Query(() => [Venue], { name: 'venues' })
  findAll (@Args('findAllVenuesInput') findAllVenuesInput: FindAllVenuesInput): Promise<Venue[]> {
    return this.service.findAll(findAllVenuesInput);
  }

  @Query(() => Venue, { name: 'venue' })
  findOne (@Args('findOneVenueInput') findOneVenueInput: FindOneVenueInput): Promise<Venue> {
    return this.service.findOne(findOneVenueInput);
  }

  @Mutation(() => Venue, { name: 'updateVenue' })
  update (
    @Args('findOneVenueInput') findOneVenueInput: FindOneVenueInput,
    @Args('updateVenueInput') updateVenueInput: UpdateVenueInput
  ): Promise<Venue> {
    return this.service.update(
      findOneVenueInput,
      updateVenueInput
    );
  }

  @Mutation(() => Venue, { name: 'removeVenue' })
  removeVenue (@Args('venueInput') findOneVenueInput: FindOneVenueInput): Promise<Venue> {
    return this.service.remove(findOneVenueInput);
  }

  @ResolveField(() => Company, { name: 'company' })
  async company (@Parent() venue: Venue): Promise<Company> {
    const companyValue: any = venue.company;

    let companyId = companyValue;

    if (typeof companyValue !== 'number') companyId = companyValue.id;

    return this.venuesLoaders.batchCompanies.load(companyId);
  }

  @ResolveField(() => [Menu], { name: 'menus' })
  async menus (@Parent() venue: Venue): Promise<Menu[]> {
    return this.service.menus(venue);
  }

  @ResolveField(() => [Spot], { name: 'spots' })
  async spots (@Parent() venue: Venue): Promise<Spot[]> {
    return this.service.spots(venue);
  }

  @ResolveField(() => [AssignedVenue], { name: 'assignedVenues' })
  async assignedVenues (@Parent() venue: Venue): Promise<AssignedVenue[]> {
    return this.service.assignedVenues(venue);
  }
}
