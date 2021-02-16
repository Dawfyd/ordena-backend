import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Venue } from './entities/venue.entity';

import { CompaniesService } from '../companies/companies.service';

import { CreateVenueInput } from './dto/create-venue-input.dto';
import { UpdateVenueInput } from './dto/update-venue-input.dto';
import { FindAllVenuesInput } from './dto/find-all-venues-input.dto';
import { FindOneVenueInput } from './dto/find-one-venue-input.dto';

@Injectable()
export class VenuesService {
  constructor (
    @InjectRepository(Venue)
    private readonly venueRepository: Repository<Venue>,
    private readonly companiesService: CompaniesService
  ) {}

  /* CRUD RELATED OPERATIONS */

  public async create (
    createVenueInput: CreateVenueInput
  ): Promise<Venue> {
    const { companyUuid } = createVenueInput;

    const company = await this.companiesService.findOne({ companyUuid });

    if (!company) {
      throw new NotFoundException(`can't get the company with uuid ${companyUuid}.`);
    }

    const created = this.venueRepository.create({
      name: createVenueInput.name,
      description: createVenueInput.description,
      address: createVenueInput.address,
      phone: createVenueInput.phone,
      company
    });

    const saved = this.venueRepository.save(created);

    return saved;
  }

  public async findAll (findAllVenuesInput: FindAllVenuesInput): Promise<Venue[]> {
    const { companyUuid, limit, skip, search } = findAllVenuesInput;

    const query = this.venueRepository.createQueryBuilder('v')
      .loadAllRelationIds()
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid });

    if (search) {
      query.andWhere('v.name ilike :search', { search: `%${search}%` })
        .orWhere('v.address ilike :search', { search: `%${search}%` })
        .orWhere('v.phone ilike :search', { search: `%${search}%` });
    }

    const items = await query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('v.id', 'DESC')
      .getMany();

    return items;
  }

  public async findOne (findOneVenueInput: FindOneVenueInput): Promise<Venue | null> {
    const { companyUuid, id } = findOneVenueInput;

    const item = await this.venueRepository.createQueryBuilder('v')
      .loadAllRelationIds()
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('v.id = :id', { id })
      .getOne();

    return item || null;
  }

  public async update (findOneVenueInput: FindOneVenueInput, updateVenueInput: UpdateVenueInput): Promise<Venue> {
    const { companyUuid, id } = findOneVenueInput;

    const company = await this.companiesService.findOne({ companyUuid });

    if (!company) {
      throw new NotFoundException(`can't get the company with uuid ${companyUuid}.`);
    }

    const existing = await this.findOne(findOneVenueInput);

    if (!existing) {
      throw new NotFoundException(`can't get the venue ${id} for the company with uuid ${companyUuid}.`);
    }

    const merged = {
      ...existing,
      company,
      ...updateVenueInput
    };

    const saved = await this.venueRepository.save(merged);

    return saved;
  }

  public async remove (findOneVenueInput: FindOneVenueInput): Promise<Venue> {
    const { companyUuid, id } = findOneVenueInput;

    const existing = await this.findOne(findOneVenueInput);

    if (!existing) {
      throw new NotFoundException(`can't get the venue ${id} for the company with uuid ${companyUuid}.`);
    }

    const clone = { ...existing };

    await this.venueRepository.remove(existing);

    return clone;
  }

  /* CRUD RELATED OPERATIONS */

  /* OPERATIONS BECAUSE OF THE MASTER STATUS */

  public async getByIds (ids: number[]): Promise<Venue[]> {
    return this.venueRepository.findByIds(ids, {
      loadRelationIds: true
    });
  }

  /* OPERATIONS BECAUSE OF THE MASTER STATUS */

  /* OPERATIONS BECAUSE OF ONE TO MANY RELATIONS */

  public async menus (venue: Venue): Promise<any[]> {
    const { id } = venue;

    const master = await this.venueRepository.createQueryBuilder('v')
      .leftJoinAndSelect('v.menus', 'm')
      .where('v.id = :id', { id })
      .getOne();

    const items = master ? master.menus : [];

    return items.map(item => ({ ...item, venue: master.id }));
  }

  public async spots (venue: Venue): Promise<any[]> {
    const { id } = venue;

    const master = await this.venueRepository.createQueryBuilder('v')
      .leftJoinAndSelect('v.spots', 's')
      .where('v.id = :id', { id })
      .getOne();

    const items = master ? master.spots : [];

    return items.map(item => ({ ...item, venue: master.id }));
  }

  public async assignedVenues (venue: Venue): Promise<any[]> {
    const { id } = venue;

    const master = await this.venueRepository.createQueryBuilder('v')
      .leftJoinAndSelect('v.assignedVenues', 'av')
      .where('v.id = :id', { id })
      .getOne();

    const items = master ? master.assignedVenues : [];

    return items.map(item => ({ ...item, venue: master.id }));
  }

  /* OPERATIONS BECAUSE OF ONE TO MANY RELATIONS */
}
