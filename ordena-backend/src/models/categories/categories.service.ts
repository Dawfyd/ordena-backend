import { Injectable, NotFoundException } from '@nestjs/common';
import { ID } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly CategoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const newCategory = this.CategoryRepository.create(createCategoryInput);
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

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const category = await this.CategoryRepository.findOne(id);
    if (!category)
      throw new NotFoundException('No hay una categoria con esa ID');

    const editedCategory = Object.assign(category, updateCategoryInput);
    return await this.CategoryRepository.save(editedCategory);
  }

  async remove(id: number) {
    const category = await this.CategoryRepository.findOne(id);
    if (!category)
      throw new NotFoundException('No hay una categoria con esa ID');
    return await this.CategoryRepository.remove(category);
  }
}
