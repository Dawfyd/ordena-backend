import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AssignedVenuesService } from './assigned-venues.service';
import { AssignedVenue } from './entities/assigned-venue.entity';
import { CreateAssignedVenueInput } from './dto/create-assigned-venue.input';
import { UpdateAssignedVenueInput } from './dto/update-assigned-venue.input';

@Resolver(() => AssignedVenue)
export class AssignedVenuesResolver {
  constructor (private readonly assignedVenuesService: AssignedVenuesService) {}

  @Mutation(() => AssignedVenue)
  createAssignedVenue (@Args('createAssignedVenueInput') createAssignedVenueInput: CreateAssignedVenueInput) {
    return this.assignedVenuesService.create(createAssignedVenueInput);
  }

  @Query(() => [AssignedVenue], { name: 'assignedVenues' })
  findAll () {
    return this.assignedVenuesService.findAll();
  }

  @Query(() => AssignedVenue, { name: 'assignedVenue' })
  findOne (@Args('id', { type: () => Int }) id: number) {
    return this.assignedVenuesService.findOne(id);
  }

  @Mutation(() => AssignedVenue)
  updateAssignedVenue (@Args('updateAssignedVenueInput') updateAssignedVenueInput: UpdateAssignedVenueInput) {
    return this.assignedVenuesService.update(updateAssignedVenueInput.id, updateAssignedVenueInput);
  }

  @Mutation(() => AssignedVenue)
  removeAssignedVenue (@Args('id', { type: () => Int }) id: number) {
    return this.assignedVenuesService.remove(id);
  }
}
