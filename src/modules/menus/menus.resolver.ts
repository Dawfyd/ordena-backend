import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent
} from '@nestjs/graphql';

import { Menu } from './entities/menu.entity';
import { Venue } from '../venues/entities/venue.entity';
import { Category } from '../categories/entities/category.entity';

import { MenusService } from './menus.service';
import { MenusLoaders } from './menus.loaders';

import { CreateMenuInput } from './dto/create-menu-input.dto';
import { UpdateMenuInput } from './dto/update-menu.input';
import { FindAllMenusInput } from './dto/find-all-menus-input.dto';
import { FindOneMenuInput } from './dto/find-one-menu-input.dto';

@Resolver(() => Menu)
export class MenusResolver {
  constructor (
    private readonly service: MenusService,
    private readonly menusLoaders: MenusLoaders
  ) {}

  @Mutation(() => Menu, { name: 'createMenu' })
  create (@Args('createMenuInput') createMenuInput: CreateMenuInput): Promise<Menu> {
    return this.service.create(createMenuInput);
  }

  @Query(() => [Menu], { name: 'menus' })
  findAll (@Args('findAllMenusInput') findAllMenusInput: FindAllMenusInput): Promise<Menu[]> {
    return this.service.findAll(findAllMenusInput);
  }

  @Query(() => Menu, { name: 'menu', nullable: true })
  findOne (@Args('findOneMenuInput') findOneMenuInput: FindOneMenuInput): Promise<Menu> {
    return this.service.findOne(findOneMenuInput);
  }

  @Mutation(() => Menu, { name: 'updateMenu' })
  update (
    @Args('findOneMenuInput') findOneMenuInput: FindOneMenuInput,
    @Args('updateMenuInput') updateMenuInput: UpdateMenuInput
  ): Promise<Menu> {
    return this.service.update(findOneMenuInput, updateMenuInput);
  }

  @Mutation(() => Menu, { name: 'removeMenu' })
  remove (@Args('findOneMenuInput') findOneMenuInput: FindOneMenuInput): Promise<Menu> {
    return this.service.remove(findOneMenuInput);
  }

  @ResolveField(() => Venue, { name: 'venue' })
  venue (@Parent() menu: Menu): Promise<Venue> {
    const venueValue: any = menu.venue;

    let venueId = venueValue;

    if (typeof venueId !== 'number') venueId = venueValue.id;

    return this.menusLoaders.batchVenues.load(venueId);
  }

  @ResolveField(() => [Category], { name: 'categories' })
  categories (@Parent() menu: Menu): Promise<Category[]> {
    return this.service.categories(menu);
  }
}
