import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderStatus } from './entities/order-status.entity';

import { CreateOrderStatusInput } from './dto/create-order-status.input.dto';
import { FindAllOrderStatusesInput } from './dto/find-all-order-statuses.input.dto';
import { FindOneOrderStatusInput } from './dto/find-one-order-status.input.dto';
import { UpdateOrderStatusInput } from './dto/update-order-status.input.dto';

@Injectable()
export class OrderStatusesService {
  constructor (
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>
  ) {}

  public async create (createOrderStatusInput: CreateOrderStatusInput): Promise<OrderStatus> {
    const newOrderStatus = this.orderStatusRepository.create(createOrderStatusInput);
    const saved = await this.orderStatusRepository.save(newOrderStatus);
    return saved;
  }

  public async findAll (findAllOrderStatusesInput: FindAllOrderStatusesInput): Promise<OrderStatus[]> {
    const { limit, skip, search = '' } = findAllOrderStatusesInput;

    const query = this.orderStatusRepository.createQueryBuilder('os');

    if (search) {
      query.where('os.name ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('os.id', 'DESC');

    const orderStatus = await query.getMany();

    return orderStatus;
  }

  public async findOne (findOneOrderStatusInput: FindOneOrderStatusInput): Promise<OrderStatus | null> {
    const { id } = findOneOrderStatusInput;

    const orderStatus = this.orderStatusRepository.createQueryBuilder('os')
      .where('os.id = :id', { id })
      .getOne();

    return orderStatus || null;
  }

  public async update (findOneOrderStatusInput: FindOneOrderStatusInput, updateOrderStatusInput: UpdateOrderStatusInput): Promise<OrderStatus> {
    const { id } = findOneOrderStatusInput;

    const orderStatus = await this.findOne({ id });

    if (!orderStatus) {
      throw new NotFoundException(`can't get the orderStatus with id ${id}.`);
    }

    const preloaded = await this.orderStatusRepository.preload({
      id: orderStatus.id,
      ...updateOrderStatusInput
    });

    const saved = await this.orderStatusRepository.save(preloaded);
    return saved;
  }

  public async remove (findOneOrderStatusInput: FindOneOrderStatusInput): Promise<OrderStatus> {
    const { id } = findOneOrderStatusInput;
    const existing = await this.findOne({ id });

    if (!existing) {
      throw new NotFoundException(`can't get the orderStatus with id ${id}.`);
    }

    const clone = { ...existing };

    await this.orderStatusRepository.remove(existing);

    return clone;
  }

  public async getByIds (ids: number[]): Promise<OrderStatus[]> {
    return await this.orderStatusRepository.findByIds(ids, {
      loadRelationIds: true
    });
  }

  public async orders (orderStatus: OrderStatus): Promise<any[]> {
    const { id } = orderStatus;

    const master = await this.orderStatusRepository.createQueryBuilder('os')
      .leftJoinAndSelect('os.orders', 'o')
      .where('os.id = :id', { id })
      .getOne();

    const items = master ? master.orders : [];

    return items.map(item => ({ ...item, orderStatus: master.id }));
  }
}
