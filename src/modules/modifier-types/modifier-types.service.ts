import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ModifierType } from './entities/modifier-type.entity';

import { CreateModifierTypeInput } from './dto/create-modifier-type.input.dto';
import { UpdateModifierTypeInput } from './dto/update-modifier-type.input.dto';
import { FindAllModifierTypesInput } from './dto/find-all-modifier-types.input.dto';
import { FindOneModifierTypeInput } from './dto/find-one-modifier-type.input.dto';

@Injectable()
export class ModifierTypesService {
  constructor (
    @InjectRepository(ModifierType)
    private readonly modifierTypesRepository: Repository<ModifierType>
  ) {}

  public async create (createModifierTypeInput: CreateModifierTypeInput): Promise<ModifierType> {
    const created = this.modifierTypesRepository.create(createModifierTypeInput);
    const saved = await this.modifierTypesRepository.save(created);
    return saved;
  }

  public async findAll (findAllModifierTypesInput: FindAllModifierTypesInput): Promise<ModifierType[]> {
    const { limit, skip, search = '' } = findAllModifierTypesInput;

    const query = this.modifierTypesRepository.createQueryBuilder('mt');

    if (search) {
      query.where('mt.code ilike :search', { search: `%${search}%` });
      query.orWhere('mt.name ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('mt.id', 'DESC');

    const modifierType = await query.getMany();

    return modifierType;
  }

  public async findOne (findOneModifierTypeInput: FindOneModifierTypeInput): Promise<ModifierType | null> {
    const { id } = findOneModifierTypeInput;

    const item = this.modifierTypesRepository.createQueryBuilder('mt')
      .where('mt.id = :id', { id })
      .getOne();

    return item || null;
  }

  public async update (findOneModifierTypeInput: FindOneModifierTypeInput, updateModifierTypeInput: UpdateModifierTypeInput): Promise<ModifierType> {
    const { id } = findOneModifierTypeInput;
    const modifierType = await this.findOne(findOneModifierTypeInput);
    if (!modifierType) {
      throw new NotFoundException(`can't get modifierType with id ${id}`);
    }

    const preloaded = await this.modifierTypesRepository.preload({
      id: modifierType.id,
      ...updateModifierTypeInput
    });

    const saved = await this.modifierTypesRepository.save(preloaded);
    return saved;
  }

  public async remove (findOneModifierTypeInput: FindOneModifierTypeInput): Promise<ModifierType> {
    const { id } = findOneModifierTypeInput;
    const existing = await this.findOne(findOneModifierTypeInput);

    if (!existing) {
      throw new NotFoundException(`can't get modifierType with id ${id}`);
    }

    const clone = { ...existing };
    await this.modifierTypesRepository.remove(existing);

    return clone;
  }

  public async getByIds (ids: number[]): Promise<ModifierType[]> {
    return this.modifierTypesRepository.findByIds(ids, {
      loadRelationIds: true
    });
  }

  public async modifiers (modifierType: ModifierType): Promise<any[]> {
    const { id } = modifierType;

    const master = await this.modifierTypesRepository.createQueryBuilder('mt')
      .leftJoinAndSelect('mt.modifiers', 'm')
      .where('mt.id = :id', { id })
      .getOne();

    const items = master ? master.modifiers : [];

    return items.map(item => ({ ...item, modifierType: master.id }));
  }
}
