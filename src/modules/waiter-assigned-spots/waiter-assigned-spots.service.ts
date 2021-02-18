import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WaiterAssignedSpot } from './entities/waiter-assigned-spot.entity';

import { PersonsService } from '../persons/persons.service';
import { SpotsService } from '../spots/spots.service';

import { CreateWaiterAssignedSpotInput } from './dto/create-waiter-assigned-spot-input.dto';
import { FindAllWaiterAssignedSpotsInput } from './dto/find-all-waiter-assigned-spots-input.dto';
import { FindOneWaiterAssignedSpotInput } from './dto/find-one-waiter-assigned-spot-input.dto';
import { UpdateWaiterAssignedSpotInput } from './dto/update-waiter-assigned-spot-input.dto';
@Injectable()
export class WaiterAssignedSpotsService {
  constructor (
    @InjectRepository(WaiterAssignedSpot)
    private readonly waiterAssignedSpotRepository: Repository<WaiterAssignedSpot>,
    private readonly personsService: PersonsService,
    private readonly spotsService: SpotsService
  ) {}

  public async create (createWaiterAssignedSpotInput: CreateWaiterAssignedSpotInput): Promise<WaiterAssignedSpot> {
    const { personId } = createWaiterAssignedSpotInput;

    const person = await this.personsService.getById({ id: personId });

    if (!person) {
      throw new NotFoundException('can\'t get person.');
    }

    // TODO check if the person is waiter

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
}
