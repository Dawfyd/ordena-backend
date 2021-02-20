import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';

import { AssignedProductsService } from './assigned-products.service';
import { AssignedProduct } from './entities/assigned-product.entity';
import { Product } from '../products/entities/product.entity';
import { AssignedProductsLoaders } from './assigned-products.loaders';

import { CreateAssignedProductInput } from './dto/create-assigned-product-input.dto';
import { UpdateAssignedProductInput } from './dto/update-assigned-product-input.dto';
import { FindAllAssignedProductInput } from './dto/find-all-assigned-product-input.dto';
import { FindOneAssignedProductInput } from './dto/find-one-assigned-product-input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => AssignedProduct)
export class AssignedProductsResolver {
  constructor (
    private readonly service: AssignedProductsService,
    private readonly assignedProductsLoaders: AssignedProductsLoaders
  ) {}

  @Mutation(() => AssignedProduct, { name: 'assingProductToProduct' })
  assingProductToProduct (@Args('createAssignedProductInput') createAssignedProductInput: CreateAssignedProductInput): Promise<AssignedProduct> {
    return this.service.assingProductToProduct(createAssignedProductInput);
  }

  @Query(() => [AssignedProduct], { name: 'assignedProducts' })
  findAll (@Args('findAllAssignedProductInput') findAllAssignedProductInput: FindAllAssignedProductInput): Promise<AssignedProduct[]> {
    return this.service.findAll(findAllAssignedProductInput);
  }

  @Query(() => AssignedProduct, { name: 'assignedProduct', nullable: true })
  findOne (@Args('findOneAssignedProductInput') findOneAssignedProductInput: FindOneAssignedProductInput): Promise<AssignedProduct> {
    return this.service.findOne(findOneAssignedProductInput);
  }

  @Mutation(() => AssignedProduct, { name: 'updateAssignedProduct' })
  updateAssignedProduct (
    @Args('findOneAssignedProductInput') findOneAssignedProductInput: FindOneAssignedProductInput,
    @Args('updateAssignedProductInput') updateAssignedProductInput: UpdateAssignedProductInput
  ): Promise<AssignedProduct> {
    return this.service.update(findOneAssignedProductInput, updateAssignedProductInput);
  }

  @Mutation(() => AssignedProduct)
  removeAssignedProduct (@Args('findOneAssignedProductInput') findOneAssignedProductInput: FindOneAssignedProductInput): Promise<AssignedProduct> {
    return this.service.remove(findOneAssignedProductInput);
  }

  @ResolveField(() => Product, { name: 'parent' })
  parent (@Parent() assignedProduct: AssignedProduct): Promise<Product> {
    const productValue: any = assignedProduct.parent;

    let productId = productValue;

    if (typeof productId !== 'number') productId = productValue.id;

    return this.assignedProductsLoaders.batchProducts.load(productId);
  }

  @ResolveField(() => Product, { name: 'assigned' })
  assigned (@Parent() assignedProduct: AssignedProduct): Promise<Product> {
    const productValue: any = assignedProduct.assigned;

    let productId = productValue;

    if (typeof productId !== 'number') productId = productValue.id;

    return this.assignedProductsLoaders.batchProducts.load(productId);
  }
}
