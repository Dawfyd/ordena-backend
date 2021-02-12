import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';

import { Company } from './entities/company.entity';
import { Venue } from '../venues/entities/venue.entity';

import { CompaniesService } from './companies.service';

import { CreateCompanyInput } from './dto/create-company-input.dto';
import { UpdateCompanyInput } from './dto/update-company-input.dto';
import { FindAllCompaniesInput } from './dto/find-all-companies-input.dto';
import { FindOneCompanyInput } from './dto/find-company-one-input.dto';
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => Company)
export class CompaniesResolver {
  constructor (
    private readonly service: CompaniesService
  ) {}

  @Mutation(() => Company, { name: 'createCompany' })
  create (
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput
  ): Promise<Company> {
    return this.service.create(createCompanyInput);
  }

  @Query(() => [Company], { name: 'companies' })
  findAll (
    @Args('findAllCompaniesInput') findAllCompaniesInput: FindAllCompaniesInput
  ): Promise<Company[]> {
    return this.service.findAll(findAllCompaniesInput);
  }

  @Query(() => Company, { name: 'company' })
  findOne (@Args('findOneCompanyInput') findOneCompanyInput: FindOneCompanyInput): Promise<Company | null> {
    return this.service.findOne(findOneCompanyInput);
  }

  @Mutation(() => Company, { name: 'updateCompany' })
  update (
    @Args('findOneCompanyInput') findOneInput: FindOneCompanyInput,
    @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput
  ): Promise<Company> {
    return this.service.update(findOneInput, updateCompanyInput);
  }

  @Mutation(() => Company)
  removeCompany (@Args('findOneCompanyInput') findOneCompanyInput: FindOneCompanyInput): Promise<Company> {
    return this.service.remove(findOneCompanyInput);
  }

  @ResolveField(() => [Venue], { name: 'venues' })
  async venues (@Parent() company: Company): Promise<Venue[]> {
    return this.service.venues(company);
  }
}
