import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderStatusInput } from './dto/create-order-status.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';
import { OrderStatus } from './entities/order-status.entity';

@Injectable()
export class OrderStatusesService {
  constructor(
    @InjectRepository(OrderStatus)
    private readonly OrderStatusRepository: Repository<OrderStatus>
  ){}
  async create(createOrderStatusInput: CreateOrderStatusInput) {
    const newOrderStatus = this.OrderStatusRepository.create(createOrderStatusInput);
    return await this.OrderStatusRepository.save(newOrderStatus);
  }

  async findAll() {
    return await this.OrderStatusRepository.find();
  }

  async findOne(id: number) {
    const orderStatus = await this.OrderStatusRepository.findOne(id);
    if(!orderStatus) throw new NotFoundException('no hay registro con este id');
    return orderStatus;
  }

  async update(id: number, updateOrderStatusInput: UpdateOrderStatusInput) {
    const orderStatus = await this.findOne(id);

    const editedOrderStatus = this.OrderStatusRepository.merge(orderStatus,updateOrderStatusInput);
    return await this.OrderStatusRepository.save(editedOrderStatus);
  }

  async remove(id: number) {
    const orderStatus = await this.findOne(id);
    return await this.OrderStatusRepository.remove(orderStatus);
  }
}
