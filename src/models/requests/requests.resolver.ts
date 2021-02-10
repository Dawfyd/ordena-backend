import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { RequestsService } from './requests.service';
import { Request } from './entities/request.entity';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { ModifiersPerRequestService } from '../modifiers-per-request/modifiers-per-request.service';

@Resolver(() => Request)
export class RequestsResolver {
  constructor(
    private readonly RequestsService: RequestsService,
    private readonly modifiersPerRequestsService: ModifiersPerRequestService
  ) {}

  @Mutation(() => Request)
  createRequest(
    @Args('createRequestInput')
    createRequestInput: CreateRequestInput,
  ) {
    return this.RequestsService.create(createRequestInput);
  }

  @Query(() => [Request], { name: 'requests' })
  findAll() {
    return this.RequestsService.findAll();
  }

  @Query(() => Request, { name: 'request' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.RequestsService.findOne(id);
  }

  @Mutation(() => Request)
  updateRequest(
    @Args('updateRequestInput')
    updateRequestInput: UpdateRequestInput,
  ) {
    return this.RequestsService.update(
      updateRequestInput.id_request,
      updateRequestInput,
    );
  }

  @Mutation(() => Request)
  removeRequest(@Args('id', { type: () => Int }) id: number) {
    return this.RequestsService.remove(id);
  }

  @ResolveField()
  async modifiersPerRequests(@Parent() Request: Request){
    const { id } = Request;
    return  this.modifiersPerRequestsService.findRequestModifiersPerRequest(id);
  }
}
