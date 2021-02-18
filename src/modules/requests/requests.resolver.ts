import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';

import { RequestsService } from './requests.service';
import { Request } from './entities/request.entity';
import { ModifiersPerRequestService } from '../modifiers-per-request/modifiers-per-request.service';

import { CreateRequestInput } from './dto/create-request.input.dto';
import { UpdateRequestInput } from './dto/update-request.input.dto';
import { FindAllRequestsInput } from './dto/find-all-request.input.dto';
import { FindOneRequestInput } from './dto/find-one-request.input.dto';
import { FindOneRequestStatusInput } from '../request-statuses/dto/find-one-request-status.input.dto';



@Resolver(() => Request)
export class RequestsResolver {
  constructor (
    private readonly Service: RequestsService,
    private readonly modifiersPerRequestsService: ModifiersPerRequestService
  ) {}

  @Mutation(() => Request, {name: 'createRequest'})
  create (
    @Args('createRequestInput') createRequestInput: CreateRequestInput
  ): Promise<Request> {
    return this.Service.create(createRequestInput);
  }

  @Query(() => [Request], { name: 'requests' })
  findAll (@Args('findAllRequestsInput') findAllRequestsInput: FindAllRequestsInput
  ): Promise<Request[]> {
    return this.Service.findAll(findAllRequestsInput);
  }

  @Query(() => Request, { name: 'request' })
  findOne (@Args('findOneRequestInput') findOneRequestInput: FindOneRequestInput
  ): Promise<Request> {
    return this.Service.findOne(findOneRequestInput);
  }

  @Mutation(() => Request, {name: 'updateRequest'})
  update (
    @Args('findOneRequestInput') findOneRequestInput: FindOneRequestStatusInput,
    @Args('updateRequestInput')updateRequestInput: UpdateRequestInput
  ): Promise<Request> {
    return this.Service.update(
      findOneRequestInput,
      updateRequestInput
    );
  }

  @Mutation(() => Request)
  removeRequest (@Args('findOneRequestInput')  findOneRequestInput: FindOneRequestStatusInput
  ): Promise<Request> {
    return this.Service.remove(findOneRequestInput);
  }

  @ResolveField()
  async modifiersPerRequests (@Parent() Request: Request) {
    const { id } = Request;
    return this.modifiersPerRequestsService.findRequestModifiersPerRequest(id);
  }
}
