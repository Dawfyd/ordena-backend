import { Resolver, Query, Mutation, Args,  ResolveField, Parent } from '@nestjs/graphql';

import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { RequestsService } from '../requests/requests.service';

import { CreateOrderInput } from './dto/create-order.input.dto';
import { UpdateOrderInput } from './dto/update-order.input.dto';
import { FindAllOrderInput } from './dto/find-all-order.input.dto';
import { FindOneOrderInput } from './dto/find-one-order.input.dto';

@Resolver(() => Order)
export class OrdersResolver {
  constructor (private readonly ordersService: OrdersService,
              private readonly requestsService: RequestsService) {}

  @Mutation(() => Order,{name: 'createOrder'})
  create (@Args('createOrderInput') createOrderInput: CreateOrderInput): Promise<Order> {
    return this.ordersService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  findAll (@Args('findAllOrderInput') findAllOrderInput: FindAllOrderInput): Promise<Order[]> {
    return this.ordersService.findAll(findAllOrderInput);
  }

  @Query(() => Order, { name: 'order' })
  findOne (@Args('findOneOrderInput') findOneOrderInput: FindOneOrderInput): Promise<Order> | null {
    return this.ordersService.findOne(findOneOrderInput);
  }

  @Mutation(() => Order, {name: 'updateOrder'})
  update (
    @Args('findOneOrderInput')  findOneOrderInput: FindOneOrderInput,
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput): Promise<Order> {
    return this.ordersService.update(
      findOneOrderInput,
      updateOrderInput
    );
  }

  @Mutation(() => Order, {name: 'removeOrder'})
  removeOrder (@Args('findOneOrderInput') findOneOrderInput: FindOneOrderInput): Promise<Order> {
    return this.ordersService.remove(findOneOrderInput);
  }

  @ResolveField()
  async requests (@Parent() Order: Order) {
    const { id } = Order;
    return this.requestsService.findOrderRequest(id);
  }
}
