import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ModifiersPerRequest } from './entities/modifiers-per-request.entity';

import { ModifiersService } from '../modifiers/modifiers.service';
import { RequestsService } from '../requests/requests.service';

import { CreateModifiersPerRequestInput } from './dto/create-modifiers-per-request-input.dto';
import { FindAllModifiersPerRequestInput } from './dto/find-all-modifiers-per-request-input.dto';
import { UpdateModifiersPerRequestInput } from './dto/update-modifiers-per-request-input.dto';
import { FindOneModifierPerRequestInput } from './dto/find-one-modifier-per-request-input.dto';

@Injectable()
export class ModifiersPerRequestService {
  constructor (
    @InjectRepository(ModifiersPerRequest)
    private readonly modifiersPerRequestRepository: Repository<ModifiersPerRequest>,
    private readonly requestService: RequestsService,
    private readonly modifiersService: ModifiersService
  ) {}

  async create (createModifiersPerRequestInput: CreateModifiersPerRequestInput): Promise<ModifiersPerRequest> {
    const { companyUuid, modifierId } = createModifiersPerRequestInput;

    const modifier = await this.modifiersService.findOne({ companyUuid, id: modifierId });

    if (!modifier) {
      throw new NotFoundException(`can't get the the modifier ${modifierId} for the company uuid ${companyUuid}.`);
    }

    const { requestId } = createModifiersPerRequestInput;

    const request = await this.requestService.findOne({ companyUuid, id: requestId });

    if (!request) {
      throw new NotFoundException(`can't get the the request ${requestId} for the company uuid ${companyUuid}.`);
    }

    const created = this.modifiersPerRequestRepository.create({
      modifier,
      request
    });

    const saved = await this.modifiersPerRequestRepository.save(created);

    return saved;
  }

  async findAll (findAllModifiersPerRequestInput: FindAllModifiersPerRequestInput): Promise<ModifiersPerRequest[]> {
    const { companyUuid, limit, skip } = findAllModifiersPerRequestInput;

    const items = await this.modifiersPerRequestRepository.createQueryBuilder('mpr')
      .loadAllRelationIds()
      .innerJoin('mpr.modifier', 'm')
      .innerJoin('m.product', 'p')
      .innerJoin('p.productsInVenues', 'piv')
      .innerJoin('piv.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('mpr.id', 'DESC')
      .getMany();

    return items;
  }

  async findOne (findOneModifierPerRequestInput: FindOneModifierPerRequestInput): Promise<ModifiersPerRequest | null> {
    const { companyUuid, id, checkExisting = false } = findOneModifierPerRequestInput;

    const item = await this.modifiersPerRequestRepository.createQueryBuilder('mpr')
      .loadAllRelationIds()
      .innerJoin('mpr.modifier', 'm')
      .innerJoin('m.product', 'p')
      .innerJoin('p.productsInVenues', 'piv')
      .innerJoin('piv.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('mpr.id = :id', { id })
      .getOne();

    if (checkExisting && !item) {
      throw new NotFoundException(`can't get the modifier per request ${id} for the company with uuid ${companyUuid}`);
    }

    return item || null;
  }

  async update (
    findOneModifierPerRequestInput: FindOneModifierPerRequestInput,
    updateModifiersPerRequestInput: UpdateModifiersPerRequestInput
  ): Promise<ModifiersPerRequest> {
    const { companyUuid, id } = findOneModifierPerRequestInput;

    const existing = await this.findOne({ companyUuid, id, checkExisting: true });

    const { modifierId } = updateModifiersPerRequestInput;

    let modifier;

    if (modifierId) {
      modifier = await this.modifiersService.findOne({ companyUuid, id: modifierId });

      if (!modifier) {
        throw new NotFoundException(`can't get the the modifier ${modifierId} for the company uuid ${companyUuid}.`);
      }
    }

    const { requestId } = updateModifiersPerRequestInput;

    let request;

    if (requestId) {
      request = await this.requestService.findOne({ companyUuid, id: requestId });

      if (!request) {
        throw new NotFoundException(`can't get the the request ${requestId} for the company uuid ${companyUuid}.`);
      }
    }

    const preloaded = await this.modifiersPerRequestRepository.preload({
      id: existing.id,
      modifier,
      request
    });

    const saved = await this.modifiersPerRequestRepository.save(preloaded);

    return saved;
  }

  async remove (findOneModifierPerRequestInput: FindOneModifierPerRequestInput): Promise<ModifiersPerRequest> {
    const { companyUuid, id } = findOneModifierPerRequestInput;

    const existing = await this.findOne({ companyUuid, id, checkExisting: true });

    const clone = { ...existing };

    await this.modifiersPerRequestRepository.remove(existing);

    return clone;
  }
}
