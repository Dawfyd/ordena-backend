import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { OrderStatusesService } from './order-statuses.service';
import { OrderStatus } from './entities/order-status.entity';
import { CreateOrderStatusInput } from './dto/create-order-status.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';
import { OrdersService } from '../orders/orders.service';

@Resolver(() => OrderStatus)
export class OrderStatusesResolver {
  constructor (private readonly orderStatusesService: OrderStatusesService,
              private readonly rodersService: OrdersService) {}

  @Mutation(() => OrderStatus)
  createOrderStatus (@Args('createOrderStatusInput') createOrderStatusInput: CreateOrderStatusInput) {
    return this.orderStatusesService.create(createOrderStatusInput);
  }

  @Query(() => [OrderStatus], { name: 'orderStatuses' })
  findAll () {
    return this.orderStatusesService.findAll();
  }

  @Query(() => OrderStatus, { name: 'orderStatus' })
  findOne (@Args('id', { type: () => Int }) id: number) {
    return this.orderStatusesService.findOne(id);
  }

  @Mutation(() => OrderStatus)
  updateOrderStatus (@Args('updateOrderStatusInput') updateOrderStatusInput: UpdateOrderStatusInput) {
    return this.orderStatusesService.update(updateOrderStatusInput.id, updateOrderStatusInput);
  }

  @Mutation(() => OrderStatus)
  removeOrderStatus (@Args('id', { type: () => Int }) id: number) {
    return this.orderStatusesService.remove(id);
  }

  @ResolveField()
  async orders (@Parent() OrderStatus: OrderStatus) {
    const { id } = OrderStatus;
    return this.rodersService.findOrderStatusOrder(id);
  }
}
