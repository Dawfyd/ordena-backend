import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';

import { Company } from './entities/company.entity';
import { Venue } from '../venues/entities/venue.entity';

import { CompaniesService } from './companies.service';

import { CreateInput } from './dto/create-input.dto';
import { UpdateCompanyInput } from './dto/update-company-input.dto';
import { FindAllInput } from './dto/find-all-input.dto';
import { FindOneInput } from './dto/find-one-input.dto';
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => Company)
export class CompaniesResolver {
  constructor(
    private readonly service: CompaniesService
  ) {}

  @Mutation(() => Company, { name: 'createCompany' })
  create(
    @Args('createCompanyInput') createCompanyInput: CreateInput,
  ): Promise<Company> {
    return this.service.create(createCompanyInput);
  }

  @Query(() => [Company], { name: 'companies' })
  findAll(
    @Args('findAllInput') findAllInput: FindAllInput,
  ): Promise<Company[]> {
    return this.service.findAll(findAllInput);
  }

  @Query(() => Company, { name: 'company' })
  findOne(@Args('findOneInput') findOneInput: FindOneInput): Promise<Company | null> {
    return this.service.findOne(findOneInput);
  }

  @Mutation(() => Company, { name: 'updateCompany' })
  update(
    @Args('findOneInput') findOneInput: FindOneInput,
    @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput
  ): Promise<Company> {
    return this.service.update(findOneInput, updateCompanyInput);
  }

  @Mutation(() => Company)
  removeCompany(@Args('findOneInput') findOneInput: FindOneInput,): Promise<Company> {
    return this.service.remove(findOneInput);
  }

  @ResolveField()
  async venues(@Parent() company: Company): Promise<Venue[]> {
    return this.service.venues(company);
  }
}
