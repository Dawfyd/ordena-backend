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

  async create (createOrderInput: CreateOrderInput): Promise<Order> {
    const { person_id, spot_id, order_status_id } = createOrderInput;

    const person = await this.personasService.findOne(person_id);
    const spot = await this.spotsService.findOne(spot_id);
    const orderStatus = await this.orderStatusesService.findOne({id: order_status_id});

    if(!orderStatus){
      throw new NotFoundException(`can't get the orderStatus with id ${order_status_id}.`);
    }

    const created = this.OrderRepository.create({ ...createOrderInput, person, spot, orderStatus });
    const saved = await this.OrderRepository.save(created);
    return saved ;
  }

  async findAll (findAllOrderInput: FindAllOrderInput): Promise<Order[]> {
    const { limit, skip, search= '' } = findAllOrderInput;

    const query = this.OrderRepository.createQueryBuilder('o')
    .loadAllRelationIds();

    if(search){
      query.where('o.price ilike :search', { search: `%${search}%` });
    }

    const items = await query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('o.id', 'DESC')
      .getMany();

    return items;
  }

  async findOne (findOneOrderInput: FindOneOrderInput): Promise<Order> | null {
    const { id } = findOneOrderInput;

    const item = await this.OrderRepository.createQueryBuilder('o')
    .where('o.id = :id',{id})
    .getOne();

    return item || null;
  }

  async findPersonOrder (person: number): Promise<Order[]> {
    return await this.OrderRepository.find({
      where: {
        person
      }
    });
  }

  async findOrderStatusOrder (orderStatus: number): Promise<Order[]> {
    return await this.OrderRepository.find({
      where: {
        orderStatus
      }
    });
  }

  async findSpotOrder (spot: number): Promise<Order[]> {
    return await this.OrderRepository.find({
      where: {
        spot
      }
    });
  }

  async update (findOneOrderInput: FindOneOrderInput, updateOrderInput: UpdateOrderInput): Promise<Order> {
    const { id } = findOneOrderInput;
    const order = await this.findOne(findOneOrderInput);

    if (!order) {
      throw new NotFoundException(`can't get the order with id ${id}.`);
    }

    const { person_id, spot_id, order_status_id } = updateOrderInput;

    const person = await this.personasService.findOne(person_id);
    const spot = await this.spotsService.findOne(spot_id);
    const orderStatus = await this.orderStatusesService.findOne({id: order_status_id});

    if (!orderStatus) {
      throw new NotFoundException(`can't get the orderStatus with id ${order_status_id}.`);
    }

    const preloaded = await this.OrderRepository.preload({
        id: order.id,
       ...updateOrderInput, person, spot, orderStatus });

       const saved = await this.OrderRepository.save(preloaded);
    return saved;
  }

  async remove (findOneOrderInput: FindOneOrderInput): Promise<Order> {
    const { id } = findOneOrderInput;
    const existing = await this.findOne(findOneOrderInput);

    if (!existing) {
      throw new NotFoundException(`can't get the order ${id}.`);
    }

    const clone = { ...existing };

    await this.OrderRepository.remove(existing);
    return clone;
  }
}
