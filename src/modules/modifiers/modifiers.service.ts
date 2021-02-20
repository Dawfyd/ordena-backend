import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Modifier } from './entities/modifier.entity';

import { ProductsService } from '../products/products.service';

import { CreateModifierInput } from './dto/create-modifier-input.dto';
import { FindAllModifiersInput } from './dto/find-all-modifiers-input.dto';
import { UpdateModifierInput } from './dto/update-modifier-input.dto';
import { FindOneModifierInput } from './dto/find-one-modifier-input.dto';
@Injectable()
export class ModifiersService {
  constructor (
    @InjectRepository(Modifier)
    private readonly modifierRepository: Repository<Modifier>,
    private readonly productsSerice: ProductsService
  ) {}

  async create (createModifierInput: CreateModifierInput): Promise<Modifier> {
    const { companyUuid, productId } = createModifierInput;

    const product = await this.productsSerice.findOne({ companyUuid, id: productId });

    if (!product) {
      throw new NotFoundException(`can't get the product ${productId} for the company with uuid ${companyUuid}.`);
    }

    const created = this.modifierRepository.create({
      ...createModifierInput,
      product
    });

    const saved = await this.modifierRepository.save(created);

    return saved;
  }

  async findAll (findAllModifiersInput: FindAllModifiersInput): Promise<Modifier[]> {
    const { companyUuid, limit, skip, search } = findAllModifiersInput;

    const query = this.modifierRepository.createQueryBuilder('m')
      .loadAllRelationIds()
      .innerJoin('m.product', 'p')
      .innerJoin('p.productsInVenues', 'piv')
      .innerJoin('piv.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid });

    if (search) {
      query.andWhere('m.name ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('m.id', 'DESC');

    const items = await query.getMany();

    return items;
  }

  async findOne (findOneModifierInput: FindOneModifierInput): Promise<Modifier | null> {
    const { companyUuid, id } = findOneModifierInput;

    const item = await this.modifierRepository.createQueryBuilder('m')
      .loadAllRelationIds()
      .innerJoin('m.product', 'p')
      .innerJoin('p.productsInVenues', 'piv')
      .innerJoin('piv.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('m.id = :id', { id })
      .getOne();

    return item || null;
  }

  async update (
    findOneModifierInput: FindOneModifierInput,
    updateModifierInput: UpdateModifierInput
  ): Promise<Modifier> {
    const { companyUuid, id } = findOneModifierInput;

    const existing = await this.findOne(findOneModifierInput);

    if (!existing) {
      throw new NotFoundException(`can't get the modifier ${id} for the company with uuid ${companyUuid}`);
    }

    const { productId } = updateModifierInput;

    let product;

    if (productId) {
      product = await this.productsSerice.findOne({ companyUuid, id: productId });

      if (!product) {
        throw new NotFoundException(`can't get the product ${productId} for the company with uuid ${companyUuid}.`);
      }
    }

    const preloaded = await this.modifierRepository.preload({
      id: existing.id,
      ...updateModifierInput,
      product
    });

    const saved = await this.modifierRepository.save(preloaded);

    return saved;
  }

  async remove (findOneModifierInput: FindOneModifierInput): Promise<Modifier> {
    const { companyUuid, id } = findOneModifierInput;

    const existing = await this.findOne(findOneModifierInput);

    if (!existing) {
      throw new NotFoundException(`can't get the modifier ${id} for the company with uuid ${companyUuid}`);
    }

    const clone = { ...existing };

    await this.modifierRepository.remove(existing);

    return clone;
  }

  public async modifiersPerRequests (modifier: Modifier): Promise<any[]> {
    const { id } = modifier;

    const master = await this.modifierRepository.createQueryBuilder('p')
      .leftJoinAndSelect('p.modifiersPerRequests', 'mpr')
      .where('mpr.id = :id', { id })
      .getOne();

    const items = master ? master.modifiersPerRequests : [];

    return items.map(item => ({ ...item, product: master.id }));
  }
}
