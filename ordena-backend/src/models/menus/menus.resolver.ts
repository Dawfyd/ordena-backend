import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  ResolveProperty,
} from '@nestjs/graphql';
import { MenusService } from './menus.service';
import { Menu } from './entities/menu.entity';
import { CreateMenuInput } from './dto/create-menu.input';
import { UpdateMenuInput } from './dto/update-menu.input';
import { CategoriesService } from 'src/models/categories/categories.service';
import { Category } from '../categories/entities/category.entity';

@Resolver(() => Menu)
export class MenusResolver {
  constructor(private readonly menusService: MenusService) {}

  @Mutation(() => Menu)
  createMenu(@Args('createMenuInput') createMenuInput: CreateMenuInput) {
    return this.menusService.create(createMenuInput);
  }

  @Query(() => [Menu], { name: 'menus' })
  findAll() {
    return this.menusService.findAll();
  }

  @Query(() => Menu, { name: 'menu' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.menusService.findOne(id);
  }

  @Mutation(() => Menu)
  updateMenu(@Args('updateMenuInput') updateMenuInput: UpdateMenuInput) {
    return this.menusService.update(updateMenuInput.id_menu, updateMenuInput);
  }

  @Mutation(() => Menu)
  removeMenu(@Args('id', { type: () => Int }) id: number) {
    return this.menusService.remove(id);
  }

}
