import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { AdditionalsPerRequestsService } from './additionals-per-requests.service';
import { AdditionalsPerRequest } from './entities/additionals-per-request.entity';
import { AdditionalsPerRequestLoaders } from './additionals-per-requests.loaders';

import { CreateAdditionalsPerRequestInput } from './dto/create-additionals-per-request.input.dto';
import { UpdateAdditionalsPerRequestInput } from './dto/update-additionals-per-request.input.dto';
import { FindAllAdditionalsPerRequestInput } from './dto/find-all-additionals-per-request.inputs.dto';
import { FindOneAdditionalsPerRequestInput } from './dto/find-one-additionals-per-request.input.dto';
import { Product } from '../products/entities/product.entity';
import { Request } from '../requests/entities/request.entity';

@Resolver(() => AdditionalsPerRequest)
export class AdditionalsPerRequestsResolver {
  constructor (private readonly service: AdditionalsPerRequestsService,
              private readonly additionalsPerRequestLoaders: AdditionalsPerRequestLoaders) {}

  @Mutation(() => AdditionalsPerRequest, { name: 'createAdditionalsPerRequest' })
  create (@Args('createAdditionalsPerRequestInput') createAdditionalsPerRequestInput: CreateAdditionalsPerRequestInput
  ): Promise<AdditionalsPerRequest> {
    return this.service.create(createAdditionalsPerRequestInput);
  }

  @Query(() => [AdditionalsPerRequest], { name: 'additionalsPerRequests' })
  findAll (@Args('findAllAdditionalsPerRequestInput') findAllAdditionalsPerRequestInput: FindAllAdditionalsPerRequestInput
  ): Promise<AdditionalsPerRequest[]> {
    return this.service.findAll(findAllAdditionalsPerRequestInput);
  }

  @Query(() => AdditionalsPerRequest, { name: 'additionalsPerRequest' })
  findOne (@Args('findOneAdditionalPerRequest') findOneAdditionalsPerRequestInput: FindOneAdditionalsPerRequestInput
  ): Promise<AdditionalsPerRequest> {
    return this.service.findOne(findOneAdditionalsPerRequestInput);
  }

  @Mutation(() => AdditionalsPerRequest, { name: 'updateAdditionalsPerRequest' })
  update (
    @Args('findOneAdditionalPerRequest') findOneAdditionalsPerRequestInput: FindOneAdditionalsPerRequestInput,
    @Args('updateAdditionalsPerRequestInput') updateAdditionalsPerRequestInput: UpdateAdditionalsPerRequestInput
  ): Promise<AdditionalsPerRequest> {
    return this.service.update(findOneAdditionalsPerRequestInput, updateAdditionalsPerRequestInput);
  }

  @Mutation(() => AdditionalsPerRequest, { name: 'removeAdditionalsPerRequest' })
  removeAdditionalsPerRequest (@Args('findOneAdditionalPerRequest') findOneAdditionalsPerRequestInput: FindOneAdditionalsPerRequestInput
  ): Promise<AdditionalsPerRequest> {
    return this.service.remove(findOneAdditionalsPerRequestInput);
  }

  @ResolveField(() => Product, { name: 'product' })
  async product (@Parent() additionalsPerRequest: AdditionalsPerRequest): Promise<Product> {
    const productValue: any = additionalsPerRequest.product;
    let productId = productValue;

    if (typeof productValue !== 'number') productId = productValue.id;
    return this.additionalsPerRequestLoaders.batchProduct.load(productId);
  }

  @ResolveField(() => Request, { name: 'request' })
  async request (@Parent() additionalsPerRequest: AdditionalsPerRequest): Promise<Request> {
    const requestValue: any = additionalsPerRequest.request;
    let requestId = requestValue;

    if (typeof requestValue !== 'number') requestId = requestValue.id;
    return this.additionalsPerRequestLoaders.batchRequest.load(requestId);
  }
}
