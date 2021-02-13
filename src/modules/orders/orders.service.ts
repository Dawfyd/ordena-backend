import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatusesService } from '../order-statuses/order-statuses.service';
import { PersonsService } from '../persons/persons.service';
import { SpotsService } from '../spots/spots.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

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

    // TODO: fix this
    const person = {};
    const spot = await this.spotsService.findOne(spot_id);
    const orderStatus = await this.orderStatusesService.findOne(order_status_id);

    const newOrder = this.OrderRepository.create({ ...createOrderInput, person, spot, orderStatus });
    return await this.OrderRepository.save(newOrder);
  }

  async findAll (): Promise<Order[]> {
    return await this.OrderRepository.find();
  }

  async findOne (id: number): Promise<Order> {
    const order = await this.OrderRepository.findOne(id);
    if (!order) throw new NotFoundException('No hay una orden con esa ID');
    return order;
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

  async update (id: number, updateOrderInput: UpdateOrderInput) {
    const order = await this.findOne(id);

    const { person_id, spot_id, order_status_id } = updateOrderInput;

    // FIXME:
    const person = {};
    const spot = await this.spotsService.findOne(spot_id);
    const orderStatus = await this.orderStatusesService.findOne(order_status_id);

    const editedOrder = this.OrderRepository.merge(order, { ...updateOrderInput, person, spot, orderStatus });
    return await this.OrderRepository.save(editedOrder);
  }

  async remove (id: number) {
    const order = await this.findOne(id);
    return await this.OrderRepository.remove(order);
  }
}
