import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { Modifier } from './entities/modifier.entity';
import { Product } from '../products/entities/product.entity';
import { ModifiersPerRequest } from '../modifiers-per-request/entities/modifiers-per-request.entity';

import { ModifiersService } from './modifiers.service';
import { ModifiersLoaders } from './modifiers.loaders';

import { CreateModifierInput } from './dto/create-modifier-input.dto';
import { UpdateModifierInput } from './dto/update-modifier-input.dto';
import { FindAllModifiersInput } from './dto/find-all-modifiers-input.dto';
import { FindOneModifierInput } from './dto/find-one-modifier-input.dto';
@Resolver(() => Modifier)
export class ModifiersResolver {
  constructor (
    private readonly modifiersService: ModifiersService,
    private readonly modifiersLoaders: ModifiersLoaders
  ) {}

  @Mutation(() => Modifier, { name: 'createModifier' })
  create (
    @Args('createModifierInput') createModifierInput: CreateModifierInput
  ): Promise<Modifier> {
    return this.modifiersService.create(createModifierInput);
  }

  @Query(() => [Modifier], { name: 'modifiers' })
  findAll (@Args('findAllModifiersInput') findAllModifiersInput: FindAllModifiersInput): Promise<Modifier[]> {
    return this.modifiersService.findAll(findAllModifiersInput);
  }

  @Query(() => Modifier, { name: 'modifier', nullable: true })
  findOne (@Args('findOneModifierInput') findOneModifierInput: FindOneModifierInput): Promise<Modifier | null> {
    return this.modifiersService.findOne(findOneModifierInput);
  }

  @Mutation(() => Modifier, { name: 'updateModifier' })
  update (
    @Args('findOneModifierInput') findOneModifierInput: FindOneModifierInput,
    @Args('updateModifierInput') updateModifierInput: UpdateModifierInput
  ): Promise<Modifier> {
    return this.modifiersService.update(
      findOneModifierInput,
      updateModifierInput
    );
  }

  @Mutation(() => Modifier, { name: 'removeModifier' })
  remove (@Args('findOneModifierInput') findOneModifierInput: FindOneModifierInput): Promise<Modifier> {
    return this.modifiersService.remove(findOneModifierInput);
  }

  @ResolveField(() => Product, { name: 'product' })
  product (@Parent() modifier: Modifier): Promise<Product> {
    const value: any = modifier.product;

    let id = value;

    if (typeof id !== 'number') id = value.id;

    return this.modifiersLoaders.batchProducts.load(id);
  }

  @ResolveField(() => [ModifiersPerRequest], { name: 'product' })
  async modifiersPerRequests (@Parent() modifier: Modifier): Promise<ModifiersPerRequest[]> {
    return this.modifiersService.modifiersPerRequests(modifier);
  }
}
