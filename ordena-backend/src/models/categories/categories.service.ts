import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenusService } from '../menus/menus.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly CategoryRepository: Repository<Category>,
    private readonly menusService: MenusService
  ) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const { id_menu } = createCategoryInput;

    const menu = await this.menusService.findOne(id_menu);
    delete createCategoryInput.id_menu;
    const newCategory = this.CategoryRepository.create({
      ...createCategoryInput,
      menu
    });

    return await this.CategoryRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    return await this.CategoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.CategoryRepository.findOne(id);
    if (!category)
      throw new NotFoundException('No hay una categoria con esa ID');
    return category;
  }

  async findCategories(menu: number): Promise<Category[]> {
    return await this.CategoryRepository.find({
      where: {
        menu
      }
    });
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput): Promise<Category> {

    const category = await this.findOne(id);

    const { id_menu } = updateCategoryInput;

    const menu = await this.menusService.findOne(id_menu);

    delete updateCategoryInput.id_menu;

    const editedCategory = this.CategoryRepository.merge(category, {
      ...updateCategoryInput,
      menu
    });

    return await this.CategoryRepository.save(editedCategory);
  }

  async remove(id: number) : Promise<Category> {
    const category = await this.findOne(id);
    return await this.CategoryRepository.remove(category);
  }
}
