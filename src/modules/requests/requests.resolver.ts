import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { RequestsService } from './requests.service';
import { Request } from './entities/request.entity';
import { RequestLoaders } from './requests.loaders';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { RequestStatus } from '../request-statuses/entities/request-status.entity';
import { Spot } from '../spots/entities/spot.entity';

import { CreateRequestInput } from './dto/create-request.input.dto';
import { UpdateRequestInput } from './dto/update-request.input.dto';
import { FindAllRequestsInput } from './dto/find-all-request.input.dto';
import { FindOneRequestInput } from './dto/find-one-request.input.dto';
import { ModifiersPerRequest } from '../modifiers-per-request/entities/modifiers-per-request.entity';

@Resolver(() => Request)
export class RequestsResolver {
  constructor (
    private readonly service: RequestsService,
    private readonly requestsLoaders: RequestLoaders
  ) {}

  @Mutation(() => Request, { name: 'createRequest' })
  create (
    @Args('createRequestInput') createRequestInput: CreateRequestInput
  ): Promise<Request> {
    return this.service.create(createRequestInput);
  }

  @Query(() => [Request], { name: 'requests' })
  findAll (@Args('findAllRequestsInput') findAllRequestsInput: FindAllRequestsInput
  ): Promise<Request[]> {
    return this.service.findAll(findAllRequestsInput);
  }

  @Query(() => Request, { name: 'request' })
  findOne (@Args('findOneRequestInput') findOneRequestInput: FindOneRequestInput
  ): Promise<Request> {
    return this.service.findOne(findOneRequestInput);
  }

  @Mutation(() => Request, { name: 'updateRequest' })
  update (
    @Args('findOneRequestInput') findOneRequestInput: FindOneRequestInput,
    @Args('updateRequestInput')updateRequestInput: UpdateRequestInput
  ): Promise<Request> {
    return this.service.update(
      findOneRequestInput,
      updateRequestInput
    );
  }

  @Mutation(() => Request)
  removeRequest (@Args('findOneRequestInput') findOneRequestInput: FindOneRequestInput
  ): Promise<Request> {
    return this.service.remove(findOneRequestInput);
  }

  @ResolveField()
  async modifiersPerRequests (@Parent() request: Request): Promise<ModifiersPerRequest[]> {
    return this.service.modifiersPerRequests(request);
  }

  @ResolveField(() => Spot, { name: 'spot' })
  async spot (@Parent() request: Request): Promise<Spot> {
    const spotValue: any = request.spot;

    let spotId = spotValue;

    if (typeof spotValue !== 'number') spotId = spotValue.id;
    return this.requestsLoaders.batchSpot.load(spotId);
  }

  @ResolveField(() => Product, { name: 'product' })
  async product (@Parent() request: Request): Promise<Product> {
    const productValue: any = request.product;
    let productId = productValue;

    if (typeof productValue !== 'number') productId = productValue.id;
    return this.requestsLoaders.batchProduct.load(productId);
  }

  @ResolveField(() => Order, { name: 'order' })
  async order (@Parent() request: Request): Promise<Order> {
    const orderValue: any = request.order;
    let orderId = orderValue;

    if (typeof orderValue !== 'number') orderId = orderValue.id;
    return this.requestsLoaders.batchOrder.load(orderId);
  }

  @ResolveField(() => RequestStatus, { name: 'requestStatus' })
  async requestStatus (@Parent() request: Request): Promise<RequestStatus> {
    const requestStatusValue: any = request.requestStatus;

    let requestStatusId = requestStatusValue;

    if (typeof requestStatusValue !== 'number') requestStatusId = requestStatusValue.id;
    return this.requestsLoaders.batchRequestStatus.load(requestStatusId);
  }
}
