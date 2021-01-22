import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { RolesPersonsService } from './roles-persons.service';
import { RolesPerson } from './entities/roles-person.entity';
import { CreateRolesPersonInput } from './dto/create-roles-person.input';
import { UpdateRolesPersonInput } from './dto/update-roles-person.input';
import { Role } from '../roles/entities/role.entity';
import { RolesService } from '../roles/roles.service';
import { Person } from '../persons/entities/person.entity';
import { PersonsService } from '../persons/persons.service';

@Resolver(() => RolesPerson)
export class RolesPersonsResolver {
  constructor(private readonly rolesPersonsService: RolesPersonsService,
    private readonly rolesService: RolesService,
    private readonly personsService: PersonsService) {}

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

  @Query(() => RolesPerson, { name: 'rolePerson' })
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

  @ResolveField()
  async role(@Parent() role: Role) {
    const { id_role } = role;
    return this.rolesService.findOne(id_role);
  }

  @ResolveField()
  async person(@Parent() person: Person) {
    const { id_person } = person;
    return this.personsService.findOne(id_person);
  }
}
