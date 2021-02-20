import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderStatusesService } from '../order-statuses/order-statuses.service';
import { PersonsService } from '../persons/persons.service';
import { SpotsService } from '../spots/spots.service';
import { Order } from './entities/order.entity';

import { CreateOrderInput } from './dto/create-order.input.dto';
import { UpdateOrderInput } from './dto/update-order.input.dto';
import { FindAllOrderInput } from './dto/find-all-order.input.dto';
import { FindOneOrderInput } from './dto/find-one-order.input.dto';

@Injectable()
export class OrdersService {
  constructor (
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
    private readonly personasService: PersonsService,
    private readonly spotsService: SpotsService,
    private readonly orderStatusesService: OrderStatusesService
  ) {}

  public async create (createOrderInput: CreateOrderInput): Promise<Order> {
    const { spotId, orderStatusId, companyUuid, authUid } = createOrderInput;

    const person = await this.personasService.findOne({ authUid });
    if (!authUid) {
      throw new NotFoundException(`can't get the person with id ${authUid}.`);
    }

    const spot = await this.spotsService.findOne({ id: spotId, companyUuid });
    if (!spot) {
      throw new NotFoundException(`can't get the spot ${spotId} for the company with uuid ${companyUuid}.`);
    }

    const orderStatus = await this.orderStatusesService.findOne({ id: orderStatusId });
    if (!orderStatus) {
      throw new NotFoundException(`can't get the orderStatus with id ${orderStatusId}.`);
    }

    const created = this.OrderRepository.create({ ...createOrderInput, person, spot, orderStatus });
    const saved = await this.OrderRepository.save(created);
    return saved;
  }

  public async findAll (findAllOrderInput: FindAllOrderInput): Promise<Order[]> {
    const { companyUuid, limit, skip, search = '' } = findAllOrderInput;

    const query = this.OrderRepository.createQueryBuilder('o')
      .loadAllRelationIds()
      .innerJoin('o.spot', 's')
      .innerJoin('s.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid });

    if (search) {
      query.where('o.price ilike :search', { search: `%${search}%` });
    }

    const items = await query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('o.id', 'DESC')
      .getMany();

    return items;
  }

  public async findOne (findOneOrderInput: FindOneOrderInput): Promise<Order> | null {
    const { id, companyUuid } = findOneOrderInput;

    const item = await this.OrderRepository.createQueryBuilder('o')
      .loadAllRelationIds()
      .innerJoin('o.spot', 's')
      .innerJoin('s.venue', 'v')
      .innerJoin('v.company', 'c')
      .where('c.uuid = :companyUuid', { companyUuid })
      .andWhere('o.id = :id', { id })
      .getOne();

    return item || null;
  }

  public async update (findOneOrderInput: FindOneOrderInput, updateOrderInput: UpdateOrderInput): Promise<Order> {
    const { id, companyUuid } = findOneOrderInput;
    const existing = await this.findOne(findOneOrderInput);

    if (!existing) {
      throw new NotFoundException(`can't get the order ${id} for the company with uuid ${companyUuid}.`);
    }

    const { personId, spotId, orderStatusId, authUid } = updateOrderInput;

    let person;
    if (personId) {
      person = await this.personasService.findOne({ authUid });

      if (!person) {
        throw new NotFoundException(`can't get the person ${authUid}.`);
      }
    }

    let spot;
    if (spotId) {
      spot = await this.spotsService.findOne({ id: spotId, companyUuid });

      if (!existing) {
        throw new NotFoundException(`can't get the spot ${spotId} for the company with uuid ${companyUuid}.`);
      }
    }

    let orderStatus;
    if (orderStatusId) {
      orderStatus = await this.orderStatusesService.findOne({ id: orderStatusId });

      if (!orderStatus) {
        throw new NotFoundException(`can't get the orderStatus with id ${orderStatusId}.`);
      }
    }

    const preloaded = await this.OrderRepository.preload({
      id: existing.id,
      ...updateOrderInput,
      person,
      spot,
      orderStatus
    });

    const saved = await this.OrderRepository.save(preloaded);
    return saved;
  }

  public async remove (findOneOrderInput: FindOneOrderInput): Promise<Order> {
    const { id, companyUuid } = findOneOrderInput;
    const existing = await this.findOne(findOneOrderInput);

    if (!existing) {
      throw new NotFoundException(`can't get the order ${id} for the company with uuid ${companyUuid}.`);
    }

    const clone = { ...existing };

    await this.OrderRepository.remove(existing);

    return clone;
  }

  public async getByIds (ids: number[]): Promise<Order[]> {
    return this.OrderRepository.findByIds(ids);
  }
}
