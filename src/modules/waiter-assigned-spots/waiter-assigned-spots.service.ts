import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WaiterAssignedSpot } from './entities/waiter-assigned-spot.entity';

import { PersonsService } from '../persons/persons.service';
import { SpotsService } from '../spots/spots.service';
import { ParametersService } from '../parameters/parameters.service';

import { CreateWaiterAssignedSpotInput } from './dto/create-waiter-assigned-spot-input.dto';
import { FindAllWaiterAssignedSpotsInput } from './dto/find-all-waiter-assigned-spots-input.dto';
import { FindOneWaiterAssignedSpotInput } from './dto/find-one-waiter-assigned-spot-input.dto';
import { UpdateWaiterAssignedSpotInput } from './dto/update-waiter-assigned-spot-input.dto';
import { StartWaiterAssignedSpotInput } from './dto/start-waiter-assigned-spot-input.dto';
import { EndWaiterAssignedSpotInput } from './dto/end-waiter-assigned-spot-input.dto';
@Injectable()
export class WaiterAssignedSpotsService {
  constructor (
    @InjectRepository(WaiterAssignedSpot)
    private readonly waiterAssignedSpotRepository: Repository<WaiterAssignedSpot>,
    private readonly personsService: PersonsService,
    private readonly spotsService: SpotsService,
    private readonly parametersService: ParametersService
  ) {}

  public async create (createWaiterAssignedSpotInput: CreateWaiterAssignedSpotInput): Promise<WaiterAssignedSpot> {
    const { personId } = createWaiterAssignedSpotInput;

    const person = await this.personsService.getById({ id: personId });

    if (!person) {
      throw new NotFoundException('can\'t get person.');
    }

    const WAITER_ROLE = await this.parametersService.getValue({ name: 'WAITER_ROLE' });

    const isWaiter = await this.personsService.checkRole({
      id: person.id,
      roleCode: WAITER_ROLE
    });

    if (!isWaiter) {
      throw new Error(`the person ${personId} is not a waiter.`);
    }

    const { companyUuid, spotId } = createWaiterAssignedSpotInput;

    const spot = await this.spotsService.findOne({ companyUuid, id: spotId });

    if (!spot) {
      throw new NotFoundException(`can't get the spot ${spotId} for the company with uuid ${companyUuid}.`);
    }

    const created = this.waiterAssignedSpotRepository.create({
      start: createWaiterAssignedSpotInput.start,
      end: createWaiterAssignedSpotInput.end,
      person,
      spot
    });

    const saved = await this.waiterAssignedSpotRepository.save(created);

    return saved;
  }

  public async findAll (findAllWaiterAssignedSpotsInput: FindAllWaiterAssignedSpotsInput): Promise<WaiterAssignedSpot[]> {
    const { companyUuid, limit, skip } = findAllWaiterAssignedSpotsInput;

    const items = await this.waiterAssignedSpotRepository.createQueryBuilder('was')
      .loadAllRelationIds()
      .innerJoin('was.spot', 's')
      .innerJoin('s.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .limit(limit || undefined)
      .offset(skip || undefined)
      .orderBy('was.id', 'DESC')
      .getMany();

    return items;
  }

  async findOne (findOneWaiterAssignedSpotInput: FindOneWaiterAssignedSpotInput): Promise<WaiterAssignedSpot> {
    const { companyUuid, id } = findOneWaiterAssignedSpotInput;

    const item = await this.waiterAssignedSpotRepository.createQueryBuilder('cas')
      .loadAllRelationIds()
      .innerJoin('cas.spot', 's')
      .innerJoin('s.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('cas.id = :id', { id })
      .getOne();

    return item || null;
  }

  async update (
    findOneWaiterAssignedSpotInput: FindOneWaiterAssignedSpotInput,
    updateWaiterAssignedSpotInput: UpdateWaiterAssignedSpotInput
  ): Promise<WaiterAssignedSpot> {
    const { companyUuid, id } = findOneWaiterAssignedSpotInput;

    const existing = await this.findOne(findOneWaiterAssignedSpotInput);

    if (!existing) {
      throw new NotFoundException(`can't get the waiter assigned spot ${id} for the company with uuid ${companyUuid}.`);
    }

    const { spotId } = updateWaiterAssignedSpotInput;

    let spot;

    if (spotId) {
      spot = await this.spotsService.findOne({ companyUuid, id: spotId });

      if (!spot) {
        throw new NotFoundException(`can't get the spot ${spotId} for the company with uuid ${companyUuid}.`);
      }
    }

    const { personId } = updateWaiterAssignedSpotInput;

    let person;

    if (personId) {
      person = await this.personsService.getById({ id: personId });

      if (!person) {
        throw new NotFoundException('can\'t get person.');
      }
    }

    const preloaded = await this.waiterAssignedSpotRepository.preload({
      id: existing.id,
      ...updateWaiterAssignedSpotInput,
      person,
      spot
    });

    const saved = await this.waiterAssignedSpotRepository.save(preloaded);

    return saved;
  }

  async remove (findOneWaiterAssignedSpotInput: FindOneWaiterAssignedSpotInput): Promise<WaiterAssignedSpot> {
    const { companyUuid, id } = findOneWaiterAssignedSpotInput;

    const existing = await this.findOne(findOneWaiterAssignedSpotInput);

    if (!existing) {
      throw new NotFoundException(`can't get the waiter assigned spot ${id} for the company with uuid ${companyUuid}.`);
    }

    const clone = { ...existing };

    await this.waiterAssignedSpotRepository.remove(existing);

    return clone;
  }

  public async start (
    startWaiterAssignedSpotInput: StartWaiterAssignedSpotInput
  ): Promise<WaiterAssignedSpot> {
    const { companyUuid, personId, spotId } = startWaiterAssignedSpotInput;

    const person = await this.personsService.getById({ id: personId, checkExisting: true });

    const WAITER_ROLE = await this.parametersService.getValue({ name: 'WAITER_ROLE' });

    const isWaiter = await this.personsService.checkRole({
      id: person.id,
      roleCode: WAITER_ROLE
    });

    if (!isWaiter) {
      throw new Error(`the person ${personId} is not a waiter.`);
    }

    const spot = await this.spotsService.findOne({ companyUuid, id: spotId, checkExisting: true });

    const assignations = await this.waiterAssignedSpotRepository.createQueryBuilder('was')
      .innerJoinAndSelect('was.person', 'p')
      .innerJoinAndSelect('was.spot', 's')
      .innerJoin('s.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('s.id = :spotId', { spotId })
      .andWhere('was.end is not null')
      .getMany();

    for (const waiterAssignedSpot of assignations) {
      if (waiterAssignedSpot.person.id !== personId) {
        throw new PreconditionFailedException(`the spot ${spotId} for the company with uuid ${companyUuid} it's already assigned to another waiter.`);
      }

      if (waiterAssignedSpot.spot.id === spotId && waiterAssignedSpot.person.id === personId) {
        throw new PreconditionFailedException(`the spot ${spotId} for the company with uuid ${companyUuid} it's already to the same waiter..`);
      }
    }

    const created = this.waiterAssignedSpotRepository.create({
      start: new Date(),
      spot,
      person
    });

    const saved = await this.waiterAssignedSpotRepository.save(created);

    return saved;
  }

  public async end (
    endWaiterAssignedSpotInput: EndWaiterAssignedSpotInput
  ): Promise<WaiterAssignedSpot> {
    const { companyUuid, personId, spotId } = endWaiterAssignedSpotInput;

    await this.personsService.getById({ id: personId, checkExisting: true });

    await this.spotsService.findOne({ companyUuid, id: spotId, checkExisting: true });

    const assignation = await this.waiterAssignedSpotRepository.createQueryBuilder('was')
      .innerJoin('was.person', 'p')
      .innerJoin('was.spot', 's')
      .innerJoin('s.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('s.id = :spotId', { spotId })
      .andWhere('p.id = :personId', { personId })
      .andWhere('was.end is not null')
      .getOne();

    if (!assignation) {
      throw new NotFoundException(`can't get the assigned spot ${spotId} for the waiter ${personId} and the company with uuid ${companyUuid}.`);
    }

    const preloaded = await this.waiterAssignedSpotRepository.preload({
      id: assignation.id,
      end: new Date()
    });

    const saved = await this.waiterAssignedSpotRepository.save(preloaded);

    return saved;
  }
}
