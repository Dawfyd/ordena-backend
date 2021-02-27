import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerAssignedSpot } from './entities/customer-assigned-spot.entity';

import { PersonsService } from '../persons/persons.service';
import { SpotsService } from '../spots/spots.service';

import { CreateCustomerAssignedSpotInput } from './dto/create-customer-assigned-spot-input.dto';
import { FindAllCustomerAssignedSpotsInput } from './dto/find-all-customer-assigned-spots-input.dto';
import { UpdateCustomerAssignedSpotInput } from './dto/update-customer-assigned-spot-input.dto';
import { FindOneCustomerAssignedSpotInput } from './dto/find-one-customer-assigned-spot-input.dto';
import { StartCustomerAssignedSpotInput } from './dto/start-customer-assigned-spot.input.dto';
import { GetCurrentCustomerAssignedSpotInput } from './dto/get-current-customer-assigned-spot-input.dto';
@Injectable()
export class CustomerAssignedSpotsService {
  constructor (
    @InjectRepository(CustomerAssignedSpot)
    private readonly customerAssignedSpotRepository: Repository<CustomerAssignedSpot>,
    private readonly personsService: PersonsService,
    private readonly spotsService: SpotsService
  ) {}

  public async create (createCustomerAssignedSpotInput: CreateCustomerAssignedSpotInput): Promise<CustomerAssignedSpot> {
    const { personId } = createCustomerAssignedSpotInput;

    const person = await this.personsService.getById({ id: personId });

    if (!person) {
      throw new NotFoundException('can\'t get person.');
    }

    // TODO check if the person is customer

    const { companyUuid, spotId } = createCustomerAssignedSpotInput;

    const spot = await this.spotsService.findOne({ companyUuid, id: spotId });

    if (!spot) {
      throw new NotFoundException(`can't get the spot ${spotId} for the company with uuid ${companyUuid}.`);
    }

    const created = this.customerAssignedSpotRepository.create({
      start: createCustomerAssignedSpotInput.start,
      end: createCustomerAssignedSpotInput.end,
      person,
      spot
    });

    const saved = await this.customerAssignedSpotRepository.save(created);

    return saved;
  }

  public async findAll (findAllCustomerAssignedSpotsInput: FindAllCustomerAssignedSpotsInput): Promise<CustomerAssignedSpot[]> {
    const { companyUuid, limit, skip } = findAllCustomerAssignedSpotsInput;

    const items = await this.customerAssignedSpotRepository.createQueryBuilder('cas')
      .loadAllRelationIds()
      .innerJoin('cas.spot', 's')
      .innerJoin('s.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .limit(limit || undefined)
      .offset(skip || undefined)
      .orderBy('cas.id', 'DESC')
      .getMany();

    return items;
  }

  async findOne (findOneCustomerAssignedSpotInput: FindOneCustomerAssignedSpotInput): Promise<CustomerAssignedSpot> {
    const { companyUuid, id, checkExisting = false } = findOneCustomerAssignedSpotInput;

    const item = await this.customerAssignedSpotRepository.createQueryBuilder('cas')
      .loadAllRelationIds()
      .innerJoin('cas.spot', 's')
      .innerJoin('s.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('cas.id = :id', { id })
      .getOne();

    if (checkExisting && !item) {
      throw new NotFoundException(`can't get the customer assigned spot ${id} for the company uuid ${companyUuid}.`);
    }

    return item || null;
  }

  async update (
    findOneCustomerAssignedSpotInput: FindOneCustomerAssignedSpotInput,
    updateCustomerAssignedSpotInput: UpdateCustomerAssignedSpotInput
  ): Promise<CustomerAssignedSpot> {
    const { companyUuid, id } = findOneCustomerAssignedSpotInput;

    const existing = await this.findOne(findOneCustomerAssignedSpotInput);

    if (!existing) {
      throw new NotFoundException(`can't get the customer assigned spot ${id} for the company with uuid ${companyUuid}.`);
    }

    const { spotId } = updateCustomerAssignedSpotInput;

    let spot;

    if (spotId) {
      spot = await this.spotsService.findOne({ companyUuid, id: spotId });

      if (!spot) {
        throw new NotFoundException(`can't get the spot ${spotId} for the company with uuid ${companyUuid}.`);
      }
    }

    const { personId } = updateCustomerAssignedSpotInput;

    let person;

    if (personId) {
      person = await this.personsService.getById({ id: personId });

      if (!person) {
        throw new NotFoundException('can\'t get person.');
      }
    }

    const preloaded = await this.customerAssignedSpotRepository.preload({
      id: existing.id,
      ...updateCustomerAssignedSpotInput,
      person,
      spot
    });

    const saved = await this.customerAssignedSpotRepository.save(preloaded);

    return saved;
  }

  public async remove (findOneCustomerAssignedSpotInput: FindOneCustomerAssignedSpotInput): Promise<CustomerAssignedSpot> {
    const { companyUuid, id } = findOneCustomerAssignedSpotInput;

    const existing = await this.findOne(findOneCustomerAssignedSpotInput);

    if (!existing) {
      throw new NotFoundException(`can't get the customer assigned spot ${id} for the company with uuid ${companyUuid}.`);
    }

    const clone = { ...existing };

    await this.customerAssignedSpotRepository.remove(existing);

    return clone;
  }

  public async start (
    startCustomerAssignedSpotInput: StartCustomerAssignedSpotInput
  ): Promise<CustomerAssignedSpot> {
    const { companyUuid, personId, spotId } = startCustomerAssignedSpotInput;

    const alreadyAssignedItem = await this.customerAssignedSpotRepository.createQueryBuilder('cas')
      .innerJoin('cas.spot', 's')
      .innerJoin('s.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('cas.person_id = :personId', { personId })
      .andWhere('cas.end is null')
      .getOne();

    if (alreadyAssignedItem) {
      throw new PreconditionFailedException(`the person ${personId} already has assigned a spot for the company with uuid ${companyUuid}.`);
    }

    const person = await this.personsService.getById({ id: personId });

    if (!person) {
      throw new NotFoundException('can\'t get person.');
    }

    // TODO: check if the person is a customer

    const spot = await this.spotsService.findOne({ companyUuid, id: spotId });

    if (!spot) {
      throw new NotFoundException(`can't get the spot ${spotId} for the company with uuid ${companyUuid}.`);
    }

    const created = this.customerAssignedSpotRepository.create({
      person,
      spot,
      start: new Date()
    });

    const saved = await this.customerAssignedSpotRepository.save(created);

    return saved;
  }

  public async getCurrent (
    getCurrentCustomerAssignedSpotInput: GetCurrentCustomerAssignedSpotInput
  ): Promise<CustomerAssignedSpot> {
    const { companyUuid, personId } = getCurrentCustomerAssignedSpotInput;

    const current = await this.customerAssignedSpotRepository.createQueryBuilder('cas')
      .loadAllRelationIds()
      .innerJoin('cas.spot', 's')
      .innerJoin('cas.person', 'p')
      .innerJoin('s.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('p.id = :personId', { personId })
      .andWhere('cas.end is null')
      .getOne();

    return current || null;
  }

  public async end (
    findOneCustomerAssignedSpotInput: FindOneCustomerAssignedSpotInput
  ): Promise<CustomerAssignedSpot> {
    const existing = await this.findOne({
      ...findOneCustomerAssignedSpotInput,
      checkExisting: true
    });

    if (existing.end) {
      throw new PreconditionFailedException(`the customer assigned spot ${existing.id} was already ended.`);
    }

    const preloaded = await this.customerAssignedSpotRepository.preload({
      id: existing.id,
      end: new Date()
    });

    const saved = await this.customerAssignedSpotRepository.save(preloaded);

    return {
      ...existing,
      ...saved
    };
  }
}
