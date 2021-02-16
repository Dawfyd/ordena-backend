import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenusService } from '../menus/menus.service';
import { CreateCategoryInput } from './dto/create-category-input.dto';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor (
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly menusService: MenusService
  ) {}

  async create (createCategoryInput: CreateCategoryInput): Promise<Category> {
    const { companyUuid, menuId } = createCategoryInput;

    const menu = await this.menusService.findOne({ companyUuid, id: menuId });

    if (!menu) {
      throw new NotFoundException(`can't get the menu ${menuId} fir the company with uuid ${companyUuid}.`);
    }

    const created = this.categoryRepository.create({
      ...createCategoryInput,
      menu
    });

    const saved = await this.categoryRepository.save(created);

    return saved;
  }

  async findAll (): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne (id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) { throw new NotFoundException('No hay una categoria con esa ID'); }
    return category;
  }

  async findCategories (menu: number): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: {
        menu
      }
    });
  }

  async update (id: number, updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    const category = await this.findOne(id);

    const { menuId } = updateCategoryInput;

    // FIXME:
    const menu = {};
    const editedCategory = this.categoryRepository.merge(category, {
      ...updateCategoryInput,
      menu
    });

    return await this.categoryRepository.save(editedCategory);
  }

  async remove (id: number) : Promise<Category> {
    const category = await this.findOne(id);
    return await this.categoryRepository.remove(category);
  }
}
