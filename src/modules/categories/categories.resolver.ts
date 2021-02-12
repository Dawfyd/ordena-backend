import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { AssignedCategoriesService } from '../assigned-categories/assigned-categories.service';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor (private readonly categoriesService: CategoriesService,
    private readonly assignedCategoriesService: AssignedCategoriesService) {}

  @Mutation(() => Category)
  createCategory (
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput
  ) {
    return this.categoriesService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll () {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne (@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory (
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput
  ) {
    return this.categoriesService.update(
      updateCategoryInput.id,
      updateCategoryInput
    );
  }

  @Mutation(() => Category)
  removeCategory (@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.remove(id);
  }

  @ResolveField()
  async assignedCategories (@Parent() category: Category) {
    const { id } = category;
    return this.assignedCategoriesService.findProductsCategory(id);
  }
}