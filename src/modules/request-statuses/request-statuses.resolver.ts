import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { RequestStatusesService } from './request-statuses.service';
import { RequestStatus } from './entities/request-status.entity';
import { Request } from '../requests/entities/request.entity';

import { CreateRequestStatusInput } from './dto/create-request-status.input.dto';
import { UpdateRequestStatusInput } from './dto/update-request-status.input.dto';
import { FindAllRequestStatusesInput } from './dto/find-all-request-statuses.input.dto';
import { FindOneRequestStatusInput } from './dto/find-one-request-status.input.dto';

@Resolver(() => RequestStatus)
export class RequestStatusesResolver {
  constructor (private readonly service: RequestStatusesService) {}

  @Mutation(() => RequestStatus, { name: 'createRequestStatus' })
  create (
    @Args('createRequestStatusInput') createRequestStatusInput: CreateRequestStatusInput
  ): Promise<RequestStatus> {
    return this.service.create(createRequestStatusInput);
  }

  @Query(() => [RequestStatus], { name: 'requestStatuses' })
  findAll (
    @Args('findAllRequestStatusesInput') findAllRequestStatusesInput: FindAllRequestStatusesInput
  ): Promise<RequestStatus[]> {
    return this.service.findAll(findAllRequestStatusesInput);
  }

  @Query(() => RequestStatus, { name: 'requestStatus' })
  findOne (@Args('findOneRequestStatusInput') findOneRequestStatusInput: FindOneRequestStatusInput
  ): Promise<RequestStatus | null> {
    return this.service.findOne(findOneRequestStatusInput);
  }

  @Mutation(() => RequestStatus, { name: 'updateRequestStatus' })
  update (
    @Args('findOneRequestStatusInput') findOneRequestStatusInput: FindOneRequestStatusInput,
    @Args('updateRequestStatusInput') updateRequestStatusInput: UpdateRequestStatusInput
  ): Promise<RequestStatus> {
    return this.service.update(findOneRequestStatusInput, updateRequestStatusInput);
  }

  @Mutation(() => RequestStatus)
  removeRequestStatus (@Args('findOneRequestStatus') findOneRequestStatusInput: FindOneRequestStatusInput
  ): Promise<RequestStatus> {
    return this.service.remove(findOneRequestStatusInput);
  }

  @ResolveField()
  async requests (@Parent() RequestStatus: RequestStatus): Promise<Request[]> {
    return this.service.requests(RequestStatus);
  }
}
