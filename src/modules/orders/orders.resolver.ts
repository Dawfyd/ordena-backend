import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { OrderLoaders } from './orders.loaders';
import { OrderStatus } from '../order-statuses/entities/order-status.entity';
import { Spot } from '../spots/entities/spot.entity';
import { Person } from '../persons/entities/person.entity';

import { CreateOrderInput } from './dto/create-order.input.dto';
import { UpdateOrderInput } from './dto/update-order.input.dto';
import { FindAllOrderInput } from './dto/find-all-order.input.dto';
import { FindOneOrderInput } from './dto/find-one-order.input.dto';

@Resolver(() => Order)
export class OrdersResolver {
  constructor (private readonly ordersService: OrdersService,
              private readonly ordersLoaders: OrderLoaders) {}

  @Mutation(() => Order, { name: 'createOrder' })
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

  @Mutation(() => Order, { name: 'updateOrder' })
  update (
    @Args('findOneOrderInput') findOneOrderInput: FindOneOrderInput,
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput): Promise<Order> {
    return this.ordersService.update(
      findOneOrderInput,
      updateOrderInput
    );
  }

  @Mutation(() => Order, { name: 'removeOrder' })
  removeOrder (@Args('findOneOrderInput') findOneOrderInput: FindOneOrderInput): Promise<Order> {
    return this.ordersService.remove(findOneOrderInput);
  }

  @ResolveField(() => OrderStatus, { name: 'orderStatus' })
  async orderStatus (@Parent() order: Order): Promise<OrderStatus> {
    const orderStatusValue: any = order.orderStatus;

    let orderStatusId = orderStatusValue;

    if (typeof orderStatusValue !== 'number') orderStatusId = orderStatusValue.id;
    return this.ordersLoaders.batchOrderStatus.load(orderStatusId);
  }

  @ResolveField(() => Spot, { name: 'spot' })
  async spot (@Parent() order: Order): Promise<Spot> {
    const spotValue: any = order.spot;

    let spotId = spotValue;

    if (typeof spotValue !== 'number') spotId = spotValue.id;
    return this.ordersLoaders.batchSpot.load(spotId);
  }

  @ResolveField(() => Person, { name: 'person' })
  async person (@Parent() order: Order): Promise<Person> {
    const personValue: any = order.person;

    let persontId = personValue;

    if (typeof personValue !== 'number') persontId = personValue.id;
    return this.ordersLoaders.batchPerson.load(persontId);
  }
}
