import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ModifierTypesService } from './modifier-types.service';
import { ModifierType } from './entities/modifier-type.entity';

import { CreateModifierTypeInput } from './dto/create-modifier-type.input.dto';
import { UpdateModifierTypeInput } from './dto/update-modifier-type.input.dto';
import { FindAllModifierTypesInput } from './dto/find-all-modifier-types.input.dto';
import { FindOneModifierTypeInput } from './dto/find-one-modifier-type.input.dto';

@Resolver(() => ModifierType)
export class ModifierTypesResolver {
  constructor (private readonly service: ModifierTypesService) {}

  @Mutation(() => ModifierType, { name: 'createModifierType' })
  create (@Args('createModifierTypeInput') createModifierTypeInput: CreateModifierTypeInput
  ): Promise<ModifierType> {
    return this.service.create(createModifierTypeInput);
  }

  @Query(() => [ModifierType], { name: 'modifierTypes' })
  findAll (@Args('findAllModifierTypesInput') findAllModifierTypesInput: FindAllModifierTypesInput): Promise<ModifierType[]> {
    return this.service.findAll(findAllModifierTypesInput);
  }

  @Query(() => ModifierType, { name: 'modifierType', nullable: true })
  findOne (@Args('findOneModifierTypeInput') findOneModifierTypeInput: FindOneModifierTypeInput): Promise<ModifierType> {
    return this.service.findOne(findOneModifierTypeInput);
  }

  @Mutation(() => ModifierType, { name: 'updateModifierType' })
  update (
    @Args('findOneModifierTypeInput') findOneModifierTypeInput: FindOneModifierTypeInput,
    @Args('updateModifierTypeInput') updateModifierTypeInput: UpdateModifierTypeInput
  ): Promise<ModifierType> {
    return this.service.update(findOneModifierTypeInput, updateModifierTypeInput);
  }

  @Mutation(() => ModifierType, { name: 'removeModifierType' })
  remove (@Args('findOneModifierTypeInput') findOneModifierTypeInput: FindOneModifierTypeInput
  ): Promise<ModifierType> {
    return this.service.remove(findOneModifierTypeInput);
  }
}
