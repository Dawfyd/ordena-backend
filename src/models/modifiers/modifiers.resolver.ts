import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ModifiersService } from './modifiers.service';
import { Modifier } from './entities/modifier.entity';
import { CreateModifierInput } from './dto/create-modifier.input';
import { UpdateModifierInput } from './dto/update-modifier.input';
import { ModifiersPerRequestService } from '../modifiers-per-request/modifiers-per-request.service';

@Resolver(() => Modifier)
export class ModifiersResolver {
  constructor(private readonly modifiersService: ModifiersService,
              private readonly modifiersPerRequestsService: ModifiersPerRequestService) {}

  @Mutation(() => Modifier)
  createModifier(
    @Args('createModifierInput') createModifierInput: CreateModifierInput,
  ) {
    return this.modifiersService.create(createModifierInput);
  }

  @Query(() => [Modifier], { name: 'modifiers' })
  findAll() {
    return this.modifiersService.findAll();
  }

  @Query(() => Modifier, { name: 'modifier' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.modifiersService.findOne(id);
  }

  @Mutation(() => Modifier)
  updateModifier(
    @Args('updateModifierInput') updateModifierInput: UpdateModifierInput,
  ) {
    return this.modifiersService.update(
      updateModifierInput.id,
      updateModifierInput,
    );
  }

  @Mutation(() => Modifier)
  removeModifier(@Args('id', { type: () => Int }) id: number) {
    return this.modifiersService.remove(id);
  }

  @ResolveField()
  async modifiersPerRequests(@Parent() Modifier: Modifier){
    const { id } = Modifier;
    return  this.modifiersPerRequestsService.findModifierModifiersPerRequest(id);
  }

}
