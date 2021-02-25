import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';

import { MenusService } from '../menus/menus.service';

import { CreateCategoryInput } from './dto/create-category-input.dto';
import { FindAllCategoriesInput } from './dto/find-all-categories-input.dto';
import { UpdateCategoryInput } from './dto/update-category.input';
import { FindOneCategoryInput } from './dto/find-one-category-input.dto';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class CategoriesService {
  constructor (
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly menusService: MenusService
  ) {}

  /* CRUD RELATED OPERATIONS */

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

  async findAll (findAllCategoriesInput: FindAllCategoriesInput): Promise<Category[]> {
    const { companyUuid, limit, skip, search } = findAllCategoriesInput;

    const query = this.categoryRepository.createQueryBuilder('c')
      .loadAllRelationIds()
      .innerJoin('c.menu', 'm')
      .innerJoin('m.venue', 'v')
      .innerJoin('v.company', 'c1')
      .where('c1.uuid = :companyUuid', { companyUuid });

    if (search) {
      query.andWhere('m.name ilike :search', { search: `%${search}%` })
        .orWhere('m.description ilike :search', { search: `%${search}%` });
    }

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('m.id', 'DESC');

    const items = await query.getMany();

    return items;
  }

  async findOne (findOneCategoryInput: FindOneCategoryInput): Promise<Category | null> {
    const { companyUuid, id, checkExisting = false } = findOneCategoryInput;

    const item = await this.categoryRepository.createQueryBuilder('c')
      .loadAllRelationIds()
      .innerJoin('c.menu', 'm')
      .innerJoin('m.venue', 'v')
      .innerJoin('v.company', 'c1')
      .where('c1.uuid = :companyUuid', { companyUuid })
      .andWhere('c.id = :id', { id })
      .getOne();

    if (checkExisting && !item) {
      throw new NotFoundException(`can't get the category ${id} for the company with uuid ${companyUuid}.`);
    }

    return item || null;
  }

  async findCategories (menu: number): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: {
        menu
      }
    });
  }

  async update (findOneCategoryInput: FindOneCategoryInput, updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    const { companyUuid, id } = findOneCategoryInput;

    const existing = await this.findOne({ companyUuid, id });

    if (!existing) {
      throw new NotFoundException(`can't get the category ${id} for the company with uuid ${companyUuid}.`);
    }

    const { menuId } = updateCategoryInput;

    let menu;

    if (menuId) {
      menu = await this.menusService.findOne({ companyUuid, id: menuId });

      if (!menu) {
        throw new NotFoundException(`can't get the menu ${menuId} for the company with uuid ${companyUuid}.`);
      }
    }

    const preloaded = await this.categoryRepository.preload({
      id: existing.id,
      ...updateCategoryInput,
      menu
    });

    const saved = await this.categoryRepository.save(preloaded);

    return saved;
  }

  async remove (findOneCategoryInput: FindOneCategoryInput) : Promise<Category> {
    const { companyUuid, id } = findOneCategoryInput;

    const existing = await this.findOne(findOneCategoryInput);

    if (!existing) {
      throw new NotFoundException(`can't get the category ${id} for the company with uuid ${companyUuid}.`);
    }

    const clone = { ...existing };

    await this.categoryRepository.remove(existing);

    return clone;
  }

  /* CRUD RELATED OPERATIONS */

  /* OPERATIONS BECAUSE OF THE MASTER STATUS */

  public async getByIds (ids: number[]): Promise<Category[]> {
    return this.categoryRepository.findByIds(ids, {
      loadRelationIds: true
    });
  }

  /* OPERATIONS BECAUSE OF THE MASTER STATUS */

  /* OPERATIONS BECAUSE OF ONE TO MANY RELATIONS */

  public async assignedCategories (category: Category): Promise<any[]> {
    const { id } = category;

    const master = await this.categoryRepository.createQueryBuilder('c')
      .leftJoinAndSelect('c.assignedCategories', 'ac')
      .where('c.id = :id', { id })
      .getOne();

    const items = master ? master.assignedCategories : [];

    return items.map(item => ({ ...item, menu: master.id }));
  }

  /* OPERATIONS BECAUSE OF ONE TO MANY RELATIONS */

  public async uploadImage(
    findOneCategoryInput: FindOneCategoryInput,
    fileUpload: FileUpload
  ): Promise<Category> {
    const existing = await this.findOne({
      ...findOneCategoryInput,
      checkExisting: true
    });

    const { createReadStream, filename, mimetype } = fileUpload;

    console.log('filename', filename, 'mimetype', mimetype);

    return existing;
  }
}
