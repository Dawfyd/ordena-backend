import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RolesPersonsService } from './roles-persons.service';
import { RolesPerson } from './entities/roles-person.entity';
import { CreateRolesPersonInput } from './dto/create-roles-person.input';
import { UpdateRolesPersonInput } from './dto/update-roles-person.input';

@Resolver(() => RolesPerson)
export class RolesPersonsResolver {
  constructor(private readonly rolesPersonsService: RolesPersonsService) {}

  @Mutation(() => RolesPerson)
  createRolesPerson(
    @Args('createRolesPersonInput')
    createRolesPersonInput: CreateRolesPersonInput,
  ) {
    return this.rolesPersonsService.create(createRolesPersonInput);
  }

  @Query(() => [RolesPerson], { name: 'rolesPersons' })
  findAll() {
    return this.rolesPersonsService.findAll();
  }

  @Query(() => RolesPerson, { name: 'rolesPerson' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rolesPersonsService.findOne(id);
  }

  @Mutation(() => RolesPerson)
  updateRolesPerson(
    @Args('updateRolesPersonInput')
    updateRolesPersonInput: UpdateRolesPersonInput,
  ) {
    return this.rolesPersonsService.update(
      updateRolesPersonInput.id_role_person,
      updateRolesPersonInput,
    );
  }

  @Mutation(() => RolesPerson)
  removeRolesPerson(@Args('id', { type: () => Int }) id: number) {
    return this.rolesPersonsService.remove(id);
  }
}
