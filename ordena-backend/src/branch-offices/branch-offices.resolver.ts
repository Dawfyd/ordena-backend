import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BranchOfficesService } from './branch-offices.service';
import { BranchOffice } from './entities/branch-office.entity';
import { CreateBranchOfficeInput } from './dto/create-branch-office.input';
import { UpdateBranchOfficeInput } from './dto/update-branch-office.input';

@Resolver(() => BranchOffice)
export class BranchOfficesResolver {
  constructor(private readonly branchOfficesService: BranchOfficesService) {}

  @Mutation(() => BranchOffice)
  createBranchOffice(
    @Args('createBranchOfficeInput') 
    createBranchOfficeInput: CreateBranchOfficeInput) {
    return this.branchOfficesService.create(createBranchOfficeInput);
  }

  @Query(() => [BranchOffice], { name: 'branch_offices' })
  findAll() {
    return this.branchOfficesService.findAll();
  }

  @Query(() => BranchOffice, { name: 'branch_office' })
  findOne(@Args('id_branch_office', { type: () => Int }) id: number) {
    return this.branchOfficesService.findOne(id);
  }

  @Mutation(() => BranchOffice)
  updateBranchOffice(@Args('updateBranchOfficeInput') updateBranchOfficeInput: UpdateBranchOfficeInput) {
    return this.branchOfficesService.update(updateBranchOfficeInput.id_branch_office, updateBranchOfficeInput);
  }

  @Mutation(() => BranchOffice)
  removeBranchOffice(@Args('id', { type: () => Int }) id: number) {
    return this.branchOfficesService.remove(id);
  }
}
