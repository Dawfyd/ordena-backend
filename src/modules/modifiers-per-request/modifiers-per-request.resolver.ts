import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { ModifiersPerRequest } from './entities/modifiers-per-request.entity';
import { Modifier } from '../modifiers/entities/modifier.entity';
import { Request } from '../requests/entities/request.entity';

import { ModifiersPerRequestService } from './modifiers-per-request.service';
import { ModifiersPerRequestLoaders } from './modifiers-per-request.loaders';

import { CreateModifiersPerRequestInput } from './dto/create-modifiers-per-request-input.dto';
import { FindAllModifiersPerRequestInput } from './dto/find-all-modifiers-per-request-input.dto';
import { FindOneModifierPerRequestInput } from './dto/find-one-modifier-per-request-input.dto';
import { UpdateModifiersPerRequestInput } from './dto/update-modifiers-per-request-input.dto';
@Resolver(() => ModifiersPerRequest)
export class ModifiersPerRequestResolver {
  constructor (
    private readonly modifiersPerRequestService: ModifiersPerRequestService,
    private readonly modifiersPerRequestLoaders: ModifiersPerRequestLoaders
  ) {}

  @Mutation(() => ModifiersPerRequest, { name: 'createModifiersPerRequest' })
  create (
    @Args('createModifiersPerRequestInput') createModifiersPerRequestInput: CreateModifiersPerRequestInput
  ): Promise<ModifiersPerRequest> {
    return this.modifiersPerRequestService.create(createModifiersPerRequestInput);
  }

  @Query(() => [ModifiersPerRequest], { name: 'modifiersPerRequests' })
  findAll (
    @Args('findAllModifiersPerRequestInput') findAllModifiersPerRequestInput: FindAllModifiersPerRequestInput
  ): Promise<ModifiersPerRequest[]> {
    return this.modifiersPerRequestService.findAll(findAllModifiersPerRequestInput);
  }

  @Query(() => ModifiersPerRequest, { name: 'modifiersPerRequest' })
  findOne (
    @Args('findOneModifierPerRequestInput') findOneModifierPerRequestInput: FindOneModifierPerRequestInput
  ): Promise<ModifiersPerRequest | null> {
    return this.modifiersPerRequestService.findOne(findOneModifierPerRequestInput);
  }

  @Mutation(() => ModifiersPerRequest, { name: 'updateModifiersPerRequest' })
  update (
    @Args('findOneModifierPerRequestInput') findOneModifierPerRequestInput: FindOneModifierPerRequestInput,
    @Args('updateModifiersPerRequestInput') updateModifiersPerRequestInput: UpdateModifiersPerRequestInput
  ): Promise<ModifiersPerRequest> {
    return this.modifiersPerRequestService.update(
      findOneModifierPerRequestInput,
      updateModifiersPerRequestInput
    );
  }

  @Mutation(() => ModifiersPerRequest, { name: 'removeModifiersPerRequest' })
  remove (
    @Args('findOneModifierPerRequestInput') findOneModifierPerRequestInput: FindOneModifierPerRequestInput
  ): Promise<ModifiersPerRequest> {
    return this.modifiersPerRequestService.remove(findOneModifierPerRequestInput);
  }

  @ResolveField(() => Modifier, { name: 'modifier' })
  modifier (@Parent() modifiersPerRequest: ModifiersPerRequest): Promise<Modifier> {
    const value: any = modifiersPerRequest.modifier;

    let id = value;

    if (typeof id !== 'number') id = value.id;

    return this.modifiersPerRequestLoaders.batchModifiers.load(id);
  }

  @ResolveField(() => Request, { name: 'request' })
  request (@Parent() modifiersPerRequest: ModifiersPerRequest): Promise<Request> {
    const value: any = modifiersPerRequest.request;

    let id = value;

    if (typeof id !== 'number') id = value.id;

    return this.modifiersPerRequestLoaders.batchRequests.load(id);
  }
}
