import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ModifiersPerRequestService } from './modifiers-per-request.service';
import { ModifiersPerRequest } from './entities/modifiers-per-request.entity';
import { CreateModifiersPerRequestInput } from './dto/create-modifiers-per-request.input';
import { UpdateModifiersPerRequestInput } from './dto/update-modifiers-per-request.input';

@Resolver(() => ModifiersPerRequest)
export class ModifiersPerRequestResolver {
  constructor (private readonly modifiersPerRequestService: ModifiersPerRequestService) {}

  @Mutation(() => ModifiersPerRequest)
  createModifiersPerRequest (@Args('createModifiersPerRequestInput') createModifiersPerRequestInput: CreateModifiersPerRequestInput) {
    return this.modifiersPerRequestService.create(createModifiersPerRequestInput);
  }

  @Query(() => [ModifiersPerRequest], { name: 'modifiersPerRequests' })
  findAll () {
    return this.modifiersPerRequestService.findAll();
  }

  @Query(() => ModifiersPerRequest, { name: 'modifiersPerRequest' })
  findOne (@Args('id', { type: () => Int }) id: number) {
    return this.modifiersPerRequestService.findOne(id);
  }

  @Mutation(() => ModifiersPerRequest)
  updateModifiersPerRequest (@Args('updateModifiersPerRequestInput') updateModifiersPerRequestInput: UpdateModifiersPerRequestInput) {
    return this.modifiersPerRequestService.update(updateModifiersPerRequestInput.id, updateModifiersPerRequestInput);
  }

  @Mutation(() => ModifiersPerRequest)
  removeModifiersPerRequest (@Args('id', { type: () => Int }) id: number) {
    return this.modifiersPerRequestService.remove(id);
  }
}
