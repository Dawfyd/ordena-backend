import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonsService } from '../persons/persons.service';
import { VenuesService } from '../venues/venues.service';
import { CreateAssignedVenueInput } from './dto/create-assigned-venue.input';
import { UpdateAssignedVenueInput } from './dto/update-assigned-venue.input';
import { AssignedVenue } from './entities/assigned-venue.entity';

@Injectable()
export class AssignedVenuesService {
  constructor (
    @InjectRepository(AssignedVenue)
    private readonly AssignedVenueRepository: Repository<AssignedVenue>,
    private readonly personsService: PersonsService,
    private readonly venuesService: VenuesService
  ) {}

  async create (createAssignedVenueInput: CreateAssignedVenueInput): Promise<AssignedVenue> {
    const { venue_id, worker_id } = createAssignedVenueInput;

    // TODO: fix this
    const venue = {};
    // TODO: fix this
    const person = {};

    const newAssignedVenue = this.AssignedVenueRepository.create({ person, venue });
    return await this.AssignedVenueRepository.save(newAssignedVenue);
  }

  async findAll (): Promise<AssignedVenue[]> {
    return await this.AssignedVenueRepository.find();
  }

  async findOne (id: number): Promise<AssignedVenue> {
    const assignedVenue = await this.AssignedVenueRepository.findOne(id);
    if (!assignedVenue) throw new NotFoundException('no hay sede asignada con este id');
    return assignedVenue;
  }

  async findVenueAssignedVenue (venue: number): Promise<AssignedVenue[]> {
    return await this.AssignedVenueRepository.find({
      where: {
        venue
      }
    });
  }

  async update (id: number, updateAssignedVenueInput: UpdateAssignedVenueInput): Promise<AssignedVenue> {
    const assignedVenue = await this.findOne(id);
    const { venue_id, worker_id } = updateAssignedVenueInput;

    // TODO: fix this
    const venue = {};
    // TODO: fix this
    const person = {};

    const editedAssignedVenue = this.AssignedVenueRepository.merge(assignedVenue, { venue, person });
    return await this.AssignedVenueRepository.save(editedAssignedVenue);
  }

  async remove (id: number): Promise<AssignedVenue> {
    const assignedVenue = await this.findOne(id);
    return await this.AssignedVenueRepository.remove(assignedVenue);
  }
}
