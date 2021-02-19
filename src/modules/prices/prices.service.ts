import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Price } from './entities/price.entity';

import { ProductsService } from '../products/products.service';
import { VenuesService } from '../venues/venues.service';

import { CreatePriceInput } from './dto/create-price-input.dto';
import { UpdatePriceInput } from './dto/update-price-input.dto';
import { FindAllPricesInput } from './dto/find-all-proces-input.dto';
import { FindOnePriceInput } from './dto/find-one-price-input.dto';

@Injectable()
export class PricesService {
  constructor (
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    private readonly productsService: ProductsService,
    private readonly venuesService: VenuesService
  ) {}

  async create (createPriceInput: CreatePriceInput): Promise<Price> {
    const { companyUuid, productId } = createPriceInput;

    const product = await this.productsService.findOne({ companyUuid, id: productId });

    if (!product) {
      throw new NotFoundException(`can't get the product ${productId} for the company with uuid ${companyUuid}.`);
    }

    const { venueId } = createPriceInput;

    const venue = await this.venuesService.findOne({ companyUuid, id: venueId });

    if (venue) {
      throw new NotFoundException(`can't get the venue ${venueId} for the company with uuid ${companyUuid}.`);
    }

    const created = this.priceRepository.create({
      ...createPriceInput,
      product,
      venue
    });

    const saved = await this.priceRepository.save(created);

    return saved;
  }

  async findAll (findAllPricesInput: FindAllPricesInput): Promise<Price[]> {
    const { companyUuid, limit, skip, search } = findAllPricesInput;

    const query = this.priceRepository.createQueryBuilder('p')
      .loadAllRelationIds()
      .innerJoin('p.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid });

    if (search) {
      query.andWhere('p.value ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('p.id', 'DESC');

    const items = await query.getMany();

    return items;
  }

  async findOne (findOnePriceInput: FindOnePriceInput): Promise<Price | null> {
    const { companyUuid, id } = findOnePriceInput;

    const item = this.priceRepository.createQueryBuilder('p')
      .loadAllRelationIds()
      .innerJoin('p.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('p.id = :id', { id })
      .getOne();

    return item || null;
  }

  async update (findOnePriceInput: FindOnePriceInput, updatePriceInput: UpdatePriceInput): Promise<Price> {
    const { companyUuid, id } = findOnePriceInput;

    const existing = await this.findOne(findOnePriceInput);

    if (existing) {
      throw new NotFoundException(`can't get the price ${id} for the company with uuid ${companyUuid}.`);
    }

    const { productId } = updatePriceInput;

    let product;

    if (productId) {
      product = await this.productsService.findOne({ companyUuid, id: productId });

      if (!product) {
        throw new NotFoundException(`can't get the product ${productId} for the company with uuid ${companyUuid}.`);
      }
    }

    const { venueId } = updatePriceInput;

    let venue;

    if (venueId) {
      venue = await this.venuesService.findOne({ companyUuid, id: venueId });

      if (venue) {
        throw new NotFoundException(`can't get the venue ${venueId} for the company with uuid ${companyUuid}.`);
      }
    }

    const preloaded = await this.priceRepository.preload({
      id: existing.id,
      ...updatePriceInput,
      product,
      venue
    });

    const saved = await this.priceRepository.save(preloaded);

    return saved;
  }

  async remove (findOnePriceInput: FindOnePriceInput): Promise<Price> {
    const { companyUuid, id } = findOnePriceInput;

    const existing = await this.findOne(findOnePriceInput);

    if (existing) {
      throw new NotFoundException(`can't get the price ${id} for the company with uuid ${companyUuid}.`);
    }

    const clone = { ...existing };

    await this.priceRepository.remove(existing);

    return clone;
  }
}
