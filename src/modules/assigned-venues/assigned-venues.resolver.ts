import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { AssignedVenue } from './entities/assigned-venue.entity';
import { Person } from '../persons/entities/person.entity';
import { Venue } from '../venues/entities/venue.entity';

import { AssignedVenuesService } from './assigned-venues.service';
import { AssignedVenuesLoaders } from './assigned-venues.loaders';

import { CreateAssignedVenueInput } from './dto/create-assigned-venue-input.dto';
import { UpdateAssignedVenueInput } from './dto/update-assigned-venue-input.dto';
import { FindAllAssignedVenuesInput } from './dto/find-all-assigned-venues-input.dto';
import { FindOneAssignedVenueInput } from './dto/find-one-assigned-venue-input.dto';

@Resolver(() => AssignedVenue)
export class AssignedVenuesResolver {
  constructor (
    private readonly assignedVenuesService: AssignedVenuesService,
    private readonly assignedVenuesLoaders: AssignedVenuesLoaders
  ) {}

  @Mutation(() => AssignedVenue, { name: 'createAssignedVenue' })
  create (
    @Args('createAssignedVenueInput') createAssignedVenueInput: CreateAssignedVenueInput
  ): Promise<AssignedVenue> {
    return this.assignedVenuesService.create(createAssignedVenueInput);
  }

  @Query(() => [AssignedVenue], { name: 'assignedVenues' })
  findAll (
    @Args('findAllAssignedVenuesInput') findAllAssignedVenuesInput: FindAllAssignedVenuesInput
  ): Promise<AssignedVenue[]> {
    return this.assignedVenuesService.findAll(findAllAssignedVenuesInput);
  }

  @Query(() => AssignedVenue, { name: 'assignedVenue', nullable: true })
  findOne (
    @Args('findOneAssignedVenueInput') findOneAssignedVenueInput: FindOneAssignedVenueInput
  ): Promise<AssignedVenue | null> {
    return this.assignedVenuesService.findOne(findOneAssignedVenueInput);
  }

  @Mutation(() => AssignedVenue)
  updateAssignedVenue (
    @Args('findOneAssignedVenueInput') findOneAssignedVenueInput: FindOneAssignedVenueInput,
    @Args('updateAssignedVenueInput') updateAssignedVenueInput: UpdateAssignedVenueInput
  ): Promise<AssignedVenue> {
    return this.assignedVenuesService.update(findOneAssignedVenueInput, updateAssignedVenueInput);
  }

  @Mutation(() => AssignedVenue)
  removeAssignedVenue (
    @Args('findOneAssignedVenueInput') findOneAssignedVenueInput: FindOneAssignedVenueInput
  ): Promise<AssignedVenue> {
    return this.assignedVenuesService.remove(findOneAssignedVenueInput);
  }

  @ResolveField(() => Person, { name: 'person' })
  person (@Parent() assignedVenue: AssignedVenue): Promise<Person> {
    const value: any = assignedVenue.person;

    let id = value;

    if (typeof id !== 'number') id = value.id;

    return this.assignedVenuesLoaders.batchPersons.load(id);
  }

  @ResolveField(() => Venue, { name: 'venue' })
  pvenuerson (@Parent() assignedVenue: AssignedVenue): Promise<Venue> {
    const value: any = assignedVenue.venue;

    let id = value;

    if (typeof id !== 'number') id = value.id;

    return this.assignedVenuesLoaders.batchVenues.load(id);
  }
}
