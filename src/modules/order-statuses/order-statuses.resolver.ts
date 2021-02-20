import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';

import { OrderStatusesService } from './order-statuses.service';
import { OrderStatus } from './entities/order-status.entity';
import { Order } from '../orders/entities/order.entity';

import { CreateOrderStatusInput } from './dto/create-order-status.input.dto';
import { UpdateOrderStatusInput } from './dto/update-order-status.input.dto';
import { FindOneOrderStatusInput } from './dto/find-one-order-status.input.dto';
import { FindAllOrderStatusesInput } from './dto/find-all-order-statuses.input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => OrderStatus)
export class OrderStatusesResolver {
  constructor (private readonly service: OrderStatusesService) {}

  @Mutation(() => OrderStatus, { name: 'createOrderStatus' })
  create (
    @Args('createOrderStatusInput') createOrderStatusInput: CreateOrderStatusInput
  ): Promise<OrderStatus> {
    return this.service.create(createOrderStatusInput);
  }

  @Query(() => [OrderStatus], { name: 'orderStatuses' })
  findAll (
    @Args('findAllOrderStatusesInput') findAllOrderStatusesInput: FindAllOrderStatusesInput
  ): Promise<OrderStatus[]> {
    return this.service.findAll(findAllOrderStatusesInput);
  }

  @Query(() => OrderStatus, { name: 'orderStatus' })
  findOne (
    @Args('findOneOrderstatusInput') FindOneOrderStatusInput: FindOneOrderStatusInput
  ): Promise<OrderStatus> {
    return this.service.findOne(FindOneOrderStatusInput);
  }

  @Mutation(() => OrderStatus, { name: 'updateOrderStatus' })
  update (
    @Args('findOneOrderStatusInput') findOneOrderStatusInput: FindOneOrderStatusInput,
    @Args('updateOrderStatusInput') updateOrderStatusInput: UpdateOrderStatusInput
  ): Promise<OrderStatus> {
    return this.service.update(findOneOrderStatusInput, updateOrderStatusInput);
  }

  @Mutation(() => OrderStatus)
  removeOrderStatus (@Args('findOneOrderStatusInput') findOneOrderStatusInput: FindOneOrderStatusInput): Promise<OrderStatus> {
    return this.service.remove(findOneOrderStatusInput);
  }

  @ResolveField(() => [Order], { name: 'orders' })
  async orders (@Parent() OrderStatus: OrderStatus): Promise<Order[]> {
    return this.service.orders(OrderStatus);
  }
}
