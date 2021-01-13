import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';

@Resolver(() => Service)
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Mutation(() => Service)
  createService(@Args('createServiceInput') createServiceInput: CreateServiceInput) {
    return this.servicesService.create(createServiceInput);
  }

  @Query(() => [Service], { name: 'services' })
  findAll() {
    return this.servicesService.findAll();
  }

  @Query(() => Service, { name: 'service' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.servicesService.findOne(id);
  }

  @Mutation(() => Service)
  updateService(@Args('updateServiceInput') updateServiceInput: UpdateServiceInput) {
    return this.servicesService.update(updateServiceInput.id_service, updateServiceInput);
  }

  @Mutation(() => Service)
  removeService(@Args('id', { type: () => Int }) id: number) {
    return this.servicesService.remove(id);
  }
}
