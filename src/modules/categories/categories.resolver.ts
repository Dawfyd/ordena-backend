import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category-input.dto';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor (private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  create (@Args('createCategoryInput') createCategoryInput: CreateCategoryInput): Promise<Category> {
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
    return [];
  }
}
