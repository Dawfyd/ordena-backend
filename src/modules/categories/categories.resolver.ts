import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';

import { Category } from './entities/category.entity';
import { Menu } from '../menus/entities/menu.entity';

import { CategoriesService } from './categories.service';
import { CategoriesLoaders } from './categories.loaders';

import { CreateCategoryInput } from './dto/create-category-input.dto';
import { UpdateCategoryInput } from './dto/update-category.input';
import { FindAllCategoriesInput } from './dto/find-all-categories-input.dto';
import { FindOneCategoryInput } from './dto/find-one-category-input.dto';
import { AssignedCategory } from '../assigned-categories/entities/assigned-category.entity';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor (
    private readonly categoriesService: CategoriesService,
    private readonly categoriesLoaders: CategoriesLoaders
  ) {}

  @Mutation(() => Category, { name: 'createCategory' })
  create (@Args('createCategoryInput') createCategoryInput: CreateCategoryInput): Promise<Category> {
    return this.categoriesService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll (@Args('findAllCategoriesInput') findAllCategoriesInput: FindAllCategoriesInput): Promise<Category[]> {
    return this.categoriesService.findAll(findAllCategoriesInput);
  }

  @Query(() => Category, { name: 'category', nullable: true })
  findOne (@Args('findOneCategoryInput') findOneCategoryInput: FindOneCategoryInput): Promise<Category> {
    return this.categoriesService.findOne(findOneCategoryInput);
  }

  @Mutation(() => Category, { name: 'updateCategory' })
  update (
    @Args('findOneCategoryInput') findOneCategoryInput: FindOneCategoryInput,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput
  ): Promise<Category> {
    return this.categoriesService.update(
      findOneCategoryInput,
      updateCategoryInput
    );
  }

  @Mutation(() => Category, { name: 'removeCategory' })
  remove (@Args('findOneCategoryInput') findOneCategoryInput: FindOneCategoryInput): Promise<Category> {
    return this.categoriesService.remove(findOneCategoryInput);
  }

  @ResolveField(() => Menu, { name: 'menu' })
  venue (@Parent() category: Category): Promise<Menu> {
    const value: any = category.menu;

    let id = value;

    if (typeof id !== 'number') id = value.id;

    return this.categoriesLoaders.batchVenues.load(id);
  }

  @ResolveField(() => AssignedCategory, { name: 'assignedCategories' })
  assignedCategories (@Parent() category: Category): Promise<AssignedCategory[]> {
    return this.categoriesService.assignedCategories(category);
  }

  @Mutation(() => Category, { name: 'uploadCategoryImage' })
  uploadImage (
    @Args('findOneCategoryInput') findOneCategoryInput: FindOneCategoryInput,
    @Args({ name: 'file', type: () => GraphQLUpload }) fileUpload: FileUpload
  ): Promise<Category> {
    console.log('findOneCategoryInput', findOneCategoryInput);
    return this.categoriesService.uploadImage(findOneCategoryInput, fileUpload);
  }
}
