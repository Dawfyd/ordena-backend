import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PersonsService } from './persons.service';
import { Person } from './entities/person.entity';
import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { FavoritesService } from '../favorites/favorites.service';
import { CustomerAssignedSpotsService } from '../customer-assigned-spots/customer-assigned-spots.service';
import { AssignedVenuesService } from '../assigned-venues/assigned-venues.service';
import { WaiterAssignedSpotsService } from '../waiter-assigned-spots/waiter-assigned-spots.service';
import { OrdersService } from '../orders/orders.service';

@Resolver(() => Person)
export class PersonsResolver {
  constructor(private readonly personsService: PersonsService,
    private readonly favoritesService: FavoritesService,
    private readonly customerAssignedSpotsService: CustomerAssignedSpotsService,
    private readonly assignedVenuesService: AssignedVenuesService,
    private readonly waiterAssignedSpotsService: WaiterAssignedSpotsService,
    private readonly ordersService: OrdersService
    ) {}

  @Mutation(() => Person)
  createPerson(
    @Args('createPersonInput') createPersonInput: CreatePersonInput,
  ) {
    return this.personsService.create(createPersonInput);
  }

  @Query(() => [Person], { name: 'persons' })
  findAll() {
    return this.personsService.findAll();
  }

  @Query(() => Person, { name: 'person' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.personsService.findOne(id);
  }

  @Mutation(() => Person)
  updatePerson(
    @Args('updatePersonInput') updatePersonInput: UpdatePersonInput,
  ) {
    return this.personsService.update(
      updatePersonInput.id,
      updatePersonInput
    );
  }

  @Mutation(() => Person)
  removePerson(@Args('id', { type: () => Int }) id: number) {
    return this.personsService.remove(id);
  }

  @ResolveField()
  async favorites(@Parent() Person: Person) {
    const { id } = Person;
    return this.favoritesService.findFavoritesPerson(id);
  }

  @ResolveField()
  async customerAssignedSpot(@Parent() Person: Person) {
    const { id } = Person;
    return this.customerAssignedSpotsService.findPersonCustomerAssignedPost(id);
  }

  @ResolveField()
  async assignedVenues(@Parent() Person: Person) {
    const { id } = Person;
    return this.assignedVenuesService.findPersonAssignedVenue(id);
  }

  @ResolveField()
  async waiterAssignedSpots(@Parent() Person: Person) {
    const { id } = Person;
    return this.waiterAssignedSpotsService.findPersonWaiterAssignedSpot(id);
  }

  @ResolveField()
  async orders(@Parent() Person: Person) {
    const { id } = Person;
    return this.ordersService.findPersonOrder(id);
  }
}
