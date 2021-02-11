import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AssignedCategoriesService } from './assigned-categories.service';
import { AssignedCategory } from './entities/assigned-category.entity';
import { CreateAssignedCategoryInput } from './dto/create-assigned-category.input';
import { UpdateAssignedCategoryInput } from './dto/update-assigned-category.input';
import { CreateAssignedCategoryMenuInput } from './dto/create-assigned-category-menu.input';

@Resolver(() => AssignedCategory)
export class AssignedCategoriesResolver {
  constructor(private readonly assignedCategoriesService: AssignedCategoriesService) {}

  @Mutation(() => AssignedCategory)
  assingCategoryToCategoryProduct(@Args('createAssignedCategoryInput') createAssignedCategoryInput: CreateAssignedCategoryInput) {
    return this.assignedCategoriesService.assingCategoryToCategoryProduct(createAssignedCategoryInput);
  }

  @Mutation(() => String)
  assingCategoriesToMenuProduct(@Args('createAssignedCategoryMenuInput') createAssignedCategoryMenuInput: CreateAssignedCategoryMenuInput) {
    return this.assignedCategoriesService.assingCategoriesToMenuProduct(createAssignedCategoryMenuInput);
  }

  @Query(() => [AssignedCategory], { name: 'assignedCategories' })
  findAll() {
    return this.assignedCategoriesService.findAll();
  }

  @Query(() => AssignedCategory, { name: 'assignedCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.assignedCategoriesService.findOne(id);
  }

  @Mutation(() => AssignedCategory)
  updateAssignedCategory(@Args('updateAssignedCategoryInput') updateAssignedCategoryInput: UpdateAssignedCategoryInput) {
    return this.assignedCategoriesService.update(
      updateAssignedCategoryInput.id,
      updateAssignedCategoryInput
    );
  }

  @Mutation(() => AssignedCategory)
  removeAssignedCategory(@Args('id', { type: () => Int }) id: number) {
    return this.assignedCategoriesService.remove(id);
  }
}
