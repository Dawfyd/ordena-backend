import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';

import { PersonsService } from './persons.service';
import { Person } from './entities/person.entity';
import { Favorite } from '../favorites/entities/favorite.entity';
import { CustomerAssignedSpot } from '../customer-assigned-spots/entities/customer-assigned-spot.entity';
import { AssignedVenue } from '../assigned-venues/entities/assigned-venue.entity';
import { WaiterAssignedSpot } from '../waiter-assigned-spots/entities/waiter-assigned-spot.entity';
import { Order } from '../orders/entities/order.entity';
import { CreatePersonInput } from './dto/create-person.input.dto';
import { UpdatePersonInput } from './dto/update-person.input.dto';
import { SendForgottenPasswordEmailInput } from './dto/send-forgotten-password-email-input.dto';
import { ChangePasswordInput } from './dto/change-password-input.dto';
import { FindAllPersonsInput } from './dto/find-all-persons-input.dto';
import { FindOnePersonInput } from './dto/find-person-one-input.dto';
import { FindAllWorkersInput } from './dto/find-all-workers-input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => Person)
export class PersonsResolver {
  constructor (private readonly service: PersonsService
  ) {}

  @Mutation(() => Person, { name: 'createAdminPerson' })
  createAdminPerson (
    @Args('createPersonInput') createPersonInput: CreatePersonInput
  ): Promise<Person> {
    return this.service.createAdmin(createPersonInput);
  }

  @Mutation(() => Person, { name: 'createWaiterPerson' })
  createWaiterPerson (
    @Args('createPersonInput') createPersonInput: CreatePersonInput
  ): Promise<Person> {
    return this.service.createWaiter(createPersonInput);
  }

  @Mutation(() => Person, { name: 'createCustomerPerson' })
  createCustomerPerson (
    @Args('createPersonInput') createPersonInput: CreatePersonInput
  ): Promise<Person> {
    return this.service.createCustomer(createPersonInput);
  }

  @Query(() => [Person], { name: 'persons' })
  findAll (
    @Args('findAllPersonsInput') findAllPersonsInput: FindAllPersonsInput
  ): Promise<Person[]> {
    return this.service.findAll(findAllPersonsInput);
  }

  @Query(() => [Person], { name: 'workers' })
  findAllWorkers (
    @Args('findAllWorkersInput') findAllWorkersInput: FindAllWorkersInput
  ): Promise<Person[]> {
    return this.service.findAll(
      findAllWorkersInput
    );
  }

  @Query(() => Person, { name: 'person' })
  findOne (@Args('findOnePersonInput') findOnePersonInput: FindOnePersonInput): Promise<Person | null> {
    return this.service.findOne(findOnePersonInput);
  }

  @Mutation(() => Person, { name: 'updatePerson' })
  update (
    @Args('findOnePersonInput') findOnePersonInput: FindOnePersonInput,
    @Args('updatePersonInput') updatePersonInput: UpdatePersonInput
  ): Promise<Person> {
    return this.service.update(
      findOnePersonInput,
      updatePersonInput
    );
  }

  @Mutation(() => Person, { name: 'removePerson' })
  remove (@Args('findOnePersonInput') findOnePersonInput: FindOnePersonInput): Promise<Person> {
    return this.service.remove(findOnePersonInput);
  }

  @Mutation(() => Person)
  sendForgottenPasswordEmail (
    @Args('sendForgottenPasswordEmailInput') sendForgottenPasswordEmailInput: SendForgottenPasswordEmailInput
  ): Promise<Person> {
    return this.service.sendForgottenPasswordEmail(sendForgottenPasswordEmailInput);
  }

  @Mutation(() => Person)
  changePassword (
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput
  ): Promise<Person> {
    return this.service.changePassword(changePasswordInput);
  }

  @ResolveField()
  async favorites (@Parent() person: Person): Promise<Favorite[]> {
    return this.service.favorites(person);
  }

  @ResolveField()
  async customerAssignedSpot (@Parent() person: Person): Promise<CustomerAssignedSpot[]> {
    return this.service.customerAssignedSpot(person);
  }

  @ResolveField()
  async assignedVenues (@Parent() person: Person): Promise<AssignedVenue[]> {
    return this.service.assignedVenues(person);
  }

  @ResolveField()
  async waiterAssignedSpots (@Parent() person: Person): Promise<WaiterAssignedSpot[]> {
    return this.service.waiterAssignedSpots(person);
  }

  @ResolveField()
  async orders (@Parent() person: Person): Promise<Order[]> {
    return this.service.orders(person);
  }
}
