import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
  ) {}

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const newOrder = this.OrderRepository.create(createOrderInput);
    return await this.OrderRepository.save(newOrder);
  }

  async findAll(): Promise<Order[]> {
    return await this.OrderRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.OrderRepository.findOne(id);
    if (!order) throw new NotFoundException('No hay una orden con esa ID');
    return order;
  }

  async update(id: number, updateOrderInput: UpdateOrderInput) {
    const order = await this.OrderRepository.findOne(id);
    if (!order) throw new NotFoundException('No hay una orden con esa ID');

    const editedOrder = Object.assign(order, updateOrderInput);
    return await this.OrderRepository.save(editedOrder);
  }

  async remove(id: number) {
    const order = await this.OrderRepository.findOne(id);
    if (!order) throw new NotFoundException('No hay una orden con esa ID');
    return await this.OrderRepository.remove(order);
  }
}
