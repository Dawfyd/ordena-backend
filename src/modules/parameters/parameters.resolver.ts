import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParametersService } from './parameters.service';
import { Parameter } from './entities/parameter.entity';
import { CreateParameterInput } from './dto/create-parameter.input';
import { UpdateParameterInput } from './dto/update-parameter.input';

@Resolver(() => Parameter)
export class ParametersResolver {
  constructor (private readonly parametersService: ParametersService) {}

  @Mutation(() => Parameter)
  createParameter (@Args('createParameterInput') createParameterInput: CreateParameterInput) {
    return this.parametersService.create(createParameterInput);
  }

  @Query(() => [Parameter], { name: 'parameters' })
  findAll () {
    return this.parametersService.findAll();
  }

  @Query(() => Parameter, { name: 'parameter' })
  findOne (@Args('id', { type: () => Int }) id: number) {
    return this.parametersService.findOne(id);
  }

  @Mutation(() => Parameter)
  updateParameter (@Args('updateParameterInput') updateParameterInput: UpdateParameterInput) {
    return this.parametersService.update(updateParameterInput.id, updateParameterInput);
  }

  @Mutation(() => Parameter)
  removeParameter (@Args('id', { type: () => Int }) id: number) {
    return this.parametersService.remove(id);
  }
}
