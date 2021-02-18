import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AssignedVenue } from './entities/assigned-venue.entity';

import { PersonsService } from '../persons/persons.service';
import { VenuesService } from '../venues/venues.service';

import { CreateAssignedVenueInput } from './dto/create-assigned-venue-input.dto';
import { FindAllAssignedVenuesInput } from './dto/find-all-assigned-venues-input.dto';
import { UpdateAssignedVenueInput } from './dto/update-assigned-venue-input.dto';
import { FindOneAssignedVenueInput } from './dto/find-one-assigned-venue-input.dto';

@Injectable()
export class AssignedVenuesService {
  constructor (
    @InjectRepository(AssignedVenue)
    private readonly assignedVenueRepository: Repository<AssignedVenue>,
    private readonly personsService: PersonsService,
    private readonly venuesService: VenuesService
  ) {}

  public async create (createAssignedVenueInput: CreateAssignedVenueInput): Promise<AssignedVenue> {
    const { companyUuid, venueId } = createAssignedVenueInput;

    const venue = await this.venuesService.findOne({ companyUuid, id: venueId });

    if (!venue) {
      throw new NotFoundException(`can't get the venue ${venueId} for the company with uuid ${companyUuid}.`);
    }

    const { workerId } = createAssignedVenueInput;

    const person = await this.personsService.getById({ id: workerId });

    if (!person) {
      throw new NotFoundException('can\'t get the person.');
    }

    const created = this.assignedVenueRepository.create({
      venue,
      person
    });

    const saved = await this.assignedVenueRepository.save(created);

    return saved;
  }

  public async findAll (findAllAssignedVenuesInput: FindAllAssignedVenuesInput): Promise<AssignedVenue[]> {
    const { companyUuid, limit, skip } = findAllAssignedVenuesInput;

    const query = this.assignedVenueRepository.createQueryBuilder('av')
      .loadAllRelationIds()
      .innerJoin('av.person', 'p')
      .innerJoin('av.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid });

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('av.id', 'DESC');

    const items = await query.getMany();

    return items;
  }

  public async findOne (findOneAssignedVenueInput: FindOneAssignedVenueInput): Promise<AssignedVenue | null> {
    const { companyUuid, id } = findOneAssignedVenueInput;

    const item = await this.assignedVenueRepository.createQueryBuilder('av')
      .loadAllRelationIds()
      .innerJoin('av.person', 'p')
      .innerJoin('av.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('av.id = :id', { id })
      .getOne();

    return item || null;
  }

  public async update (
    findOneAssignedVenueInput: FindOneAssignedVenueInput,
    updateAssignedVenueInput: UpdateAssignedVenueInput
  ): Promise<AssignedVenue> {
    const { companyUuid, id } = findOneAssignedVenueInput;

    const existing = await this.findOne({ companyUuid, id });

    if (!existing) {
      throw new NotFoundException(`can't get the assigned value ${id} for the company with uuid ${companyUuid}.`);
    }

    const { venueId } = updateAssignedVenueInput;

    let venue;

    if (venueId) {
      venue = await this.venuesService.findOne({ companyUuid, id: venueId });

      if (!venue) {
        throw new NotFoundException(`can't get the venue ${venueId} for the company with uuid ${companyUuid}.`);
      }
    }

    const { workerId } = updateAssignedVenueInput;

    let person;

    if (workerId) {
      person = await this.personsService.getById({ id: workerId });
    }

    const merged : AssignedVenue = {
      ...existing,
      venue,
      person
    };

    const saved = await this.assignedVenueRepository.save(merged);

    return saved;
  }

  public async remove (findOneAssignedVenueInput: FindOneAssignedVenueInput): Promise<AssignedVenue> {
    const { companyUuid, id } = findOneAssignedVenueInput;

    const existing = await this.findOne({ companyUuid, id });

    if (!existing) {
      throw new NotFoundException(`can't get the assigned value ${id} for the company with uuid ${companyUuid}.`);
    }

    const clone = { ...existing };

    await this.assignedVenueRepository.remove(existing);

    return clone;
  }
}
