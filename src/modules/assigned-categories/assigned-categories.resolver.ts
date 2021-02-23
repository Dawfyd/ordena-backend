import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';

import { AssignedCategoriesLoaders } from './assigned-categories.loaders';

import { AssignedCategoriesService } from './assigned-categories.service';

import { AssignedCategory } from './entities/assigned-category.entity';
import { Product } from '../products/entities/product.entity';
import { Category } from '../categories/entities/category.entity';

import { CreateAssignedCategoryInput } from './dto/create-assigned-category-input.dto';
import { UpdateAssignedCategoryInput } from './dto/update-assigned-category-input.dto';
import { CreateAssignedCategoryMenuInput } from './dto/create-assigned-category-menu-input.dto';
import { FindAllAssignedCategoriesInput } from './dto/find-all-assigned-categories-input.dto';
import { FindOneAssignedCategoyInput } from './dto/find-one-assigned-category-input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => AssignedCategory)
export class AssignedCategoriesResolver {
  constructor (
    private readonly service: AssignedCategoriesService,
    private readonly assignedCategoriesLoaders: AssignedCategoriesLoaders
  ) {}

  @Mutation(() => AssignedCategory, { name: 'assingCategoryToCategoryProduct' })
  assingCategoryToCategoryProduct (@Args('createAssignedCategoryInput') createAssignedCategoryInput: CreateAssignedCategoryInput): Promise<AssignedCategory> {
    return this.service.assingCategoryToCategoryProduct(createAssignedCategoryInput);
  }

  @Mutation(() => String, { name: 'assingCategoriesToMenuProduct' })
  assingCategoriesToMenuProduct (@Args('createAssignedCategoryMenuInput') createAssignedCategoryMenuInput: CreateAssignedCategoryMenuInput): Promise<string> {
    return this.service.assingCategoriesToMenuProduct(createAssignedCategoryMenuInput);
  }

  @Query(() => [AssignedCategory], { name: 'assignedCategories' })
  findAll (@Args('findAllAssignedCategoriesInput') findAllAssignedCategoriesInput: FindAllAssignedCategoriesInput): Promise<AssignedCategory[]> {
    return this.service.findAll(findAllAssignedCategoriesInput);
  }

  @Query(() => AssignedCategory, { name: 'assignedCategory', nullable: true })
  findOne (@Args('findOneAssignedCategoyInput') findOneAssignedCategoyInput: FindOneAssignedCategoyInput): Promise<AssignedCategory> {
    return this.service.findOne(findOneAssignedCategoyInput);
  }

  @Mutation(() => AssignedCategory, { name: 'updateAssignedCategory' })
  update (
    @Args('findOneAssignedCategoyInput') findOneAssignedCategoyInput: FindOneAssignedCategoyInput,
    @Args('updateAssignedCategoryInput') updateAssignedCategoryInput: UpdateAssignedCategoryInput
  ): Promise<AssignedCategory> {
    return this.service.update(
      findOneAssignedCategoyInput,
      updateAssignedCategoryInput
    );
  }

  @Mutation(() => AssignedCategory, { name: 'removeAssignedCategory' })
  remove (@Args('findOneAssignedCategoyInput') findOneAssignedCategoyInput: FindOneAssignedCategoyInput): Promise<AssignedCategory> {
    return this.service.remove(findOneAssignedCategoyInput);
  }

  @ResolveField(() => Product, { name: 'product' })
  product (@Parent() assignedCategory: AssignedCategory): Promise<Product> {
    const productValue: any = assignedCategory.product;

    let productId = productValue;

    if (typeof productId !== 'number') productId = productValue.id;

    return this.assignedCategoriesLoaders.batchProducts.load(productId);
  }

  @ResolveField(() => Category, { name: 'category' })
  category (@Parent() assignedCategory: AssignedCategory): Promise<Category> {
    const categoryValue: any = assignedCategory.category;

    let categoryId = categoryValue;

    if (typeof categoryId !== 'number') categoryId = categoryValue.id;

    return this.assignedCategoriesLoaders.batchCategories.load(categoryId);
  }
}
