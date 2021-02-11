import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AssignedProductsService } from './assigned-products.service';
import { AssignedProduct } from './entities/assigned-product.entity';
import { CreateAssignedProductInput } from './dto/create-assigned-product.input';
import { UpdateAssignedProductInput } from './dto/update-assigned-product.input';

@Resolver(() => AssignedProduct)
export class AssignedProductsResolver {
  constructor (private readonly assignedProductsService: AssignedProductsService) {}

  @Mutation(() => AssignedProduct)
  assingProductToProduct (@Args('createAssignedProductInput') createAssignedProductInput: CreateAssignedProductInput) {
    return this.assignedProductsService.assingProductToProduct(createAssignedProductInput);
  }

  @Query(() => [AssignedProduct], { name: 'assignedProducts' })
  findAll () {
    return this.assignedProductsService.findAll();
  }

  @Query(() => AssignedProduct, { name: 'assignedProduct' })
  findOne (@Args('id', { type: () => Int }) id: number) {
    return this.assignedProductsService.findOne(id);
  }

  @Mutation(() => AssignedProduct)
  updateAssignedProduct (@Args('updateAssignedProductInput') updateAssignedProductInput: UpdateAssignedProductInput) {
    return this.assignedProductsService.update(updateAssignedProductInput.id, updateAssignedProductInput);
  }

  @Mutation(() => AssignedProduct)
  removeAssignedProduct (@Args('id', { type: () => Int }) id: number) {
    return this.assignedProductsService.remove(id);
  }
}
