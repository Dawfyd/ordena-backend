import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AdditionalsPerRequestsService } from './additionals-per-requests.service';
import { AdditionalsPerRequest } from './entities/additionals-per-request.entity';
import { CreateAdditionalsPerRequestInput } from './dto/create-additionals-per-request.input';
import { UpdateAdditionalsPerRequestInput } from './dto/update-additionals-per-request.input';

@Resolver(() => AdditionalsPerRequest)
export class AdditionalsPerRequestsResolver {
  constructor (private readonly additionalsPerRequestsService: AdditionalsPerRequestsService) {}

  @Mutation(() => AdditionalsPerRequest)
  createAdditionalsPerRequest (@Args('createAdditionalsPerRequestInput') createAdditionalsPerRequestInput: CreateAdditionalsPerRequestInput) {
    return this.additionalsPerRequestsService.create(createAdditionalsPerRequestInput);
  }

  @Query(() => [AdditionalsPerRequest], { name: 'additionalsPerRequests' })
  findAll () {
    return this.additionalsPerRequestsService.findAll();
  }

  @Query(() => AdditionalsPerRequest, { name: 'additionalsPerRequest' })
  findOne (@Args('id', { type: () => Int }) id: number) {
    return this.additionalsPerRequestsService.findOne(id);
  }

  @Mutation(() => AdditionalsPerRequest)
  updateAdditionalsPerRequest (@Args('updateAdditionalsPerRequestInput') updateAdditionalsPerRequestInput: UpdateAdditionalsPerRequestInput) {
    return this.additionalsPerRequestsService.update(updateAdditionalsPerRequestInput.id, updateAdditionalsPerRequestInput);
  }

  @Mutation(() => AdditionalsPerRequest)
  removeAdditionalsPerRequest (@Args('id', { type: () => Int }) id: number) {
    return this.additionalsPerRequestsService.remove(id);
  }
}
