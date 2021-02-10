import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { RequestStatusesService } from './request-statuses.service';
import { RequestStatus } from './entities/request-status.entity';
import { CreateRequestStatusInput } from './dto/create-request-status.input';
import { UpdateRequestStatusInput } from './dto/update-request-status.input';
import { RequestsService } from '../requests/requests.service';

@Resolver(() => RequestStatus)
export class RequestStatusesResolver {
  constructor(private readonly requestStatusesService: RequestStatusesService,
              private readonly requestsService: RequestsService) {}

  @Mutation(() => RequestStatus)
  createRequestStatus(@Args('createRequestStatusInput') createRequestStatusInput: CreateRequestStatusInput) {
    return this.requestStatusesService.create(createRequestStatusInput);
  }

  @Query(() => [RequestStatus], { name: 'requestStatuses' })
  findAll() {
    return this.requestStatusesService.findAll();
  }

  @Query(() => RequestStatus, { name: 'requestStatus' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.requestStatusesService.findOne(id);
  }

  @Mutation(() => RequestStatus)
  updateRequestStatus(@Args('updateRequestStatusInput') updateRequestStatusInput: UpdateRequestStatusInput) {
    return this.requestStatusesService.update(updateRequestStatusInput.id, updateRequestStatusInput);
  }

  @Mutation(() => RequestStatus)
  removeRequestStatus(@Args('id', { type: () => Int }) id: number) {
    return this.requestStatusesService.remove(id);
  }

  @ResolveField()
  async requests(@Parent() RequestStatus: RequestStatus) {
    const { id } = RequestStatus;
    return this.requestsService.findRequestStatusRequest(id);
  }
}
