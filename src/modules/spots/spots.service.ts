import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Spot } from './entities/spot.entity';

import { VenuesService } from '../venues/venues.service';
import { CustomerAssignedSpot } from '../customer-assigned-spots/entities/customer-assigned-spot.entity';
import { WaiterAssignedSpot } from '../waiter-assigned-spots/entities/waiter-assigned-spot.entity';
import { Order } from '../orders/entities/order.entity';
import { Request } from '../requests/entities/request.entity';

import { CreateSpotInput } from './dto/create-spot-input.dto';
import { FindAllSpotsInput } from './dto/find-all-spots-input.dto';
import { UpdateSpotInput } from './dto/update-spot-input.dto';
import { FindOneSpotInput } from './dto/find-one-spot-input.dto';
@Injectable()
export class SpotsService {
  constructor (
    @InjectRepository(Spot)
    private readonly spotRepository: Repository<Spot>,
    private readonly venuesService: VenuesService
  ) {}

  /* CRUD RELATED OPERATIONS */

  async create (createSpotInput: CreateSpotInput): Promise<Spot> {
    const { companyUuid, venueId } = createSpotInput;
    const venue = await this.venuesService.findOne({ companyUuid, id: venueId });

    if (!venue) {
      throw new NotFoundException(`can't get the venue ${venueId} for the company with uuid ${companyUuid}.`);
    }

    const created = this.spotRepository.create({
      ...createSpotInput,
      venue
    });

    const saved = await this.spotRepository.save(created);

    return saved;
  }

  async findAll (findAllSpotsInput: FindAllSpotsInput): Promise<Spot[]> {
    const { companyUuid, limit, skip, search } = findAllSpotsInput;

    const query = this.spotRepository.createQueryBuilder('s')
      .loadAllRelationIds()
      .innerJoin('s.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid });

    if (search) {
      query.andWhere('s.name ilike :search', { search: `%${search}%` })
        .orWhere('s.spotNumber ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('s.id', 'DESC');

    const items = await query.getMany();

    return items;
  }

  async findOne (findOneSpotInput: FindOneSpotInput): Promise<Spot | null> {
    const { companyUuid, id } = findOneSpotInput;

    const item = await this.spotRepository.createQueryBuilder('s')
      .loadAllRelationIds()
      .innerJoin('s.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('s.id = :id', { id })
      .getOne();

    return item || null;
  }

  async update (findOneSpotInput: FindOneSpotInput, updateSpotInput: UpdateSpotInput): Promise<Spot> {
    const { companyUuid, id } = findOneSpotInput;

    const existing = await this.findOne({ companyUuid, id });

    if (!existing) {
      throw new NotFoundException(`can't get the spot ${id} for the company with uuid ${companyUuid}.`);
    }

    const { venueId } = updateSpotInput;

    let venue;

    if (venueId) {
      venue = await this.venuesService.findOne({ companyUuid, id: venueId });

      if (!venue) {
        throw new NotFoundException(`can't get the venue ${venueId} for the company with uuid ${companyUuid}.`);
      }
    }

    const preloaded = await this.spotRepository.preload({
      id: existing.id,
      ...updateSpotInput,
      venue
    });

    const saved = await this.spotRepository.save(preloaded);

    return saved;
  }

  async remove (findOneSpotInput: FindOneSpotInput): Promise<Spot> {
    const { companyUuid, id } = findOneSpotInput;

    const existing = await this.findOne({ companyUuid, id });

    if (!existing) {
      throw new NotFoundException(`can't get the spot ${id} for the company with uuid ${companyUuid}.`);
    }

    const clone = { ...existing };

    await this.spotRepository.remove(existing);

    return clone;
  }

  /* CRUD RELATED OPERATIONS */

  /* OPERATIONS BECAUSE OF THE MASTER STATUS */

  public async getByIds (ids: number[]): Promise<Spot[]> {
    return this.spotRepository.findByIds(ids, {
      loadRelationIds: true
    });
  }

  /* OPERATIONS BECAUSE OF THE MASTER STATUS */

  /* OPERATIONS BECAUSE OF ONE TO MANY RELATIONS */

  public async customerAssignedSpots (spot: Spot): Promise<CustomerAssignedSpot[]> {
    const { id } = spot;

    const item = await this.spotRepository.createQueryBuilder('s')
      .leftJoinAndSelect('s.customerAssignedSpots', 'cas')
      .where('s.id = :id', { id })
      .getOne();

    return item ? item.customerAssignedSpots : [];
  }

  public async waiterAssignedSpots (spot: Spot): Promise<WaiterAssignedSpot[]> {
    const { id } = spot;

    const item = await this.spotRepository.createQueryBuilder('s')
      .leftJoinAndSelect('s.waiterAssignedSpots', 'was')
      .where('s.id = :id', { id })
      .getOne();

    return item ? item.waiterAssignedSpots : [];
  }

  public async orders (spot: Spot): Promise<Order[]> {
    const { id } = spot;

    const item = await this.spotRepository.createQueryBuilder('s')
      .leftJoinAndSelect('s.orders', 'o')
      .where('s.id = :id', { id })
      .getOne();

    return item ? item.orders : [];
  }

  public async requests (spot: Spot): Promise<Request[]> {
    const { id } = spot;

    const item = await this.spotRepository.createQueryBuilder('s')
      .leftJoinAndSelect('s.requests', 'r')
      .where('s.id = :id', { id })
      .getOne();

    return item ? item.requests : [];
  }

  /* OPERATIONS BECAUSE OF ONE TO MANY RELATIONS */
}
