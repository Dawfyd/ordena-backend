import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { Modifier } from './entities/modifier.entity';
import { Product } from '../products/entities/product.entity';
import { ModifiersPerRequest } from '../modifiers-per-request/entities/modifiers-per-request.entity';

import { ModifiersService } from './modifiers.service';
import { ModifiersLoaders } from './modifiers.loaders';
import { ModifierType } from '../modifier-types/entities/modifier-type.entity';

import { CreateModifierInput } from './dto/create-modifier-input.dto';
import { UpdateModifierInput } from './dto/update-modifier-input.dto';
import { FindAllModifiersInput } from './dto/find-all-modifiers-input.dto';
import { FindOneModifierInput } from './dto/find-one-modifier-input.dto';

@Resolver(() => Modifier)
export class ModifiersResolver {
  constructor (
    private readonly service: ModifiersService,
    private readonly modifiersLoaders: ModifiersLoaders
  ) {}

  @Mutation(() => Modifier, { name: 'createModifierWithExclusive' })
  createModifierWithExclusive (
    @Args('createModifierInput') createModifierInput: CreateModifierInput
  ): Promise<Modifier> {
    return this.service.createModifierWithExclusive(createModifierInput);
  }

  @Mutation(() => Modifier, { name: 'createModifierWithOptional' })
  createModifierWithOptional (
    @Args('createModifierInput') createModifierInput: CreateModifierInput
  ): Promise<Modifier> {
    return this.service.createModifierWithOptional(createModifierInput);
  }

  @Query(() => [Modifier], { name: 'modifiers' })
  findAll (@Args('findAllModifiersInput') findAllModifiersInput: FindAllModifiersInput): Promise<Modifier[]> {
    return this.service.findAll(findAllModifiersInput);
  }

  @Query(() => Modifier, { name: 'modifier', nullable: true })
  findOne (@Args('findOneModifierInput') findOneModifierInput: FindOneModifierInput): Promise<Modifier | null> {
    return this.service.findOne(findOneModifierInput);
  }

  @Mutation(() => Modifier, { name: 'updateModifier' })
  update (
    @Args('findOneModifierInput') findOneModifierInput: FindOneModifierInput,
    @Args('updateModifierInput') updateModifierInput: UpdateModifierInput
  ): Promise<Modifier> {
    return this.service.update(
      findOneModifierInput,
      updateModifierInput
    );
  }

  @Mutation(() => Modifier, { name: 'removeModifier' })
  remove (@Args('findOneModifierInput') findOneModifierInput: FindOneModifierInput): Promise<Modifier> {
    return this.service.remove(findOneModifierInput);
  }

  @ResolveField(() => Product, { name: 'product' })
  product (@Parent() modifier: Modifier): Promise<Product> {
    const value: any = modifier.product;

    let id = value;

    if (typeof id !== 'number') id = value.id;

    return this.modifiersLoaders.batchProducts.load(id);
  }

  @ResolveField(() => ModifierType, { name: 'modifierType' })
  modifierType (@Parent() modifier: Modifier): Promise<ModifierType> {
    const value: any = modifier.modifierType;

    let id = value;

    if (typeof id !== 'number') id = value.id;

    return this.modifiersLoaders.batchModifierTypes.load(id);
  }

  @ResolveField(() => [ModifiersPerRequest], { name: 'product' })
  async modifiersPerRequests (@Parent() modifier: Modifier): Promise<ModifiersPerRequest[]> {
    return this.service.modifiersPerRequests(modifier);
  }
}
