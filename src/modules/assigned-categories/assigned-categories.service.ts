import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoriesService } from '../categories/categories.service';
import { ParametersService } from '../parameters/parameters.service';
import { ProductsService } from '../products/products.service';
import { ProductTypesService } from '../product-types/product-types.service';

import { AssignedCategory } from './entities/assigned-category.entity';

import { FindAllAssignedCategoriesInput } from './dto/find-all-assigned-categories-input.dto';
import { FindOneAssignedCategoyInput } from './dto/find-one-assigned-category-input.dto';
import { CreateAssignedCategoryMenuInput } from './dto/create-assigned-category-menu-input.dto';
import { CreateAssignedCategoryInput } from './dto/create-assigned-category-input.dto';
import { UpdateAssignedCategoryInput } from './dto/update-assigned-category-input.dto';
import { RemoveAssignedCategoriesFromMenuProductInput } from './dto/remove-assigned-categories-from-menu-product-input.dto';

@Injectable()
export class AssignedCategoriesService {
  constructor (
    @InjectRepository(AssignedCategory)
    private readonly assignedCategoryRepository: Repository<AssignedCategory>,
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly parametersService: ParametersService,
    private readonly productTypesService: ProductTypesService
  ) {}

  async assingCategoryToCategoryProduct (createAssignedCategoryInput: CreateAssignedCategoryInput): Promise<AssignedCategory> {
    const productTypeCategory = await this.parametersService.findOneName('PRODUCT_TYPE_ASSIGNED_CATEGORIES');

    if (!productTypeCategory) {
      throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_ASSIGNED_CATEGORIES".');
    }

    const { companyUuid, productId, categoryId } = createAssignedCategoryInput;

    const product = await this.productsService.findOne({ companyUuid, id: productId });

    if (!product) {
      throw new NotFoundException(`can't get the product ${productId} for the company ${companyUuid}.`);
    }

    const productType = await this.productTypesService.findOne({ id: +product.productType });

    if (productTypeCategory.value !== productType.code) {
      throw new PreconditionFailedException(`solo se pueden asignar productos de tipo ${productTypeCategory.value}`);
    }

    const category = await this.categoriesService.findOne({ companyUuid, id: categoryId });

    if (!category) {
      throw new NotFoundException(`can't get the category ${categoryId} for the company ${companyUuid}.`);
    }

    const created = this.assignedCategoryRepository.create({
      product,
      category
    });

    const saved = await this.assignedCategoryRepository.save(created);

    return saved;
  }

  async assingCategoriesToMenuProduct (createAssignedCategoryMenuInput: CreateAssignedCategoryMenuInput): Promise<string> {
    const productTypeMenu = await this.parametersService.findOneName('PRODUCT_TYPE_MENUS');

    if (!productTypeMenu) {
      throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_MENUS".');
    }

    const { companyUuid, productId } = createAssignedCategoryMenuInput;

    const product = await this.productsService.findOne({ companyUuid, id: productId });

    if (!product) {
      throw new NotFoundException(`can't get the product ${productId} for the company ${companyUuid}.`);
    }

    const productType = await this.productTypesService.findOne({ id: +product.productType });

    if (productTypeMenu.value !== productType.code) {
      throw new PreconditionFailedException(`solo se pueden asignar productos de tipo ${productTypeMenu.value}`);
    }

    const categories = await this.categoriesService.findAll({ companyUuid });

    const data = categories.map(category => ({ category, product }));

    await this.assignedCategoryRepository.createQueryBuilder()
      .insert()
      .into(AssignedCategory)
      .values(data)
      .execute();

    return 'OK';
  }

  async findAll (findAllAssignedCategoriesInput: FindAllAssignedCategoriesInput): Promise<AssignedCategory[]> {
    const { companyUuid, limit, skip } = findAllAssignedCategoriesInput;

    const query = this.assignedCategoryRepository.createQueryBuilder('ac')
      .loadAllRelationIds()
      .innerJoin('ac.category', 'c')
      .innerJoin('c.menu', 'm')
      .innerJoin('m.venue', 'v')
      .innerJoin('v.company', 'c1')
      .where('c1.uuid = :companyUuid', { companyUuid });

    query.limit(limit || undefined)
      .offset(skip || 0)
      .orderBy('ac.id', 'DESC');

    const items = await query.getMany();

    return items;
  }

  async findOne (findOneAssignedCategoyInput: FindOneAssignedCategoyInput): Promise<AssignedCategory> {
    const { companyUuid, id } = findOneAssignedCategoyInput;

    const item = await this.assignedCategoryRepository.createQueryBuilder('ac')
      .loadAllRelationIds()
      .innerJoin('ac.category', 'c')
      .innerJoin('c.menu', 'm')
      .innerJoin('m.venue', 'v')
      .innerJoin('v.company', 'c1')
      .where('c1.uuid = :companyUuid', { companyUuid })
      .andWhere('ac.id = :id', { id })
      .getOne();

    return item || null;
  }

  async update (findOneAssignedCategoyInput: FindOneAssignedCategoyInput, updateAssignedCategoryInput: UpdateAssignedCategoryInput): Promise<AssignedCategory> {
    const { companyUuid, id } = findOneAssignedCategoyInput;

    const existing = await this.findOne({ companyUuid, id });

    if (!existing) {
      throw new NotFoundException(`can't get the assigned value ${id} for the company with uuid ${companyUuid}.`);
    }

    const { productId } = updateAssignedCategoryInput;

    let product;

    if (productId) {
      product = await this.productsService.findOne({ companyUuid, id: productId });

      if (!product) {
        throw new NotFoundException(`can't get the product ${productId} for the company ${companyUuid}.`);
      }
    }

    const { categoryId } = updateAssignedCategoryInput;

    let category;

    if (categoryId) {
      category = await this.categoriesService.findOne({ companyUuid, id: categoryId });

      if (!category) {
        throw new NotFoundException(`can't get the category ${categoryId} for the company ${companyUuid}.`);
      }
    }

    const preloaded = await this.assignedCategoryRepository.preload({
      id: existing.id,
      ...updateAssignedCategoryInput,
      product,
      category
    });

    const saved = await this.assignedCategoryRepository.save(preloaded);

    return saved;
  }

  async remove (findOneAssignedCategoyInput: FindOneAssignedCategoyInput): Promise<AssignedCategory> {
    const { companyUuid, id } = findOneAssignedCategoyInput;

    const existing = await this.findOne(findOneAssignedCategoyInput);

    if (!existing) {
      throw new NotFoundException(`can't get the assigned value ${id} for the company with uuid ${companyUuid}.`);
    }

    const clone = { ...existing };

    await this.assignedCategoryRepository.remove(existing);

    return clone;
  }

  async removeAssignedCategoriesFromMenuProduct (removeAssignedCategoriesFromMenuProductInput: RemoveAssignedCategoriesFromMenuProductInput): Promise<string> {
    const productTypeMenu = await this.parametersService.findOneName('PRODUCT_TYPE_MENUS');

    if (!productTypeMenu) {
      throw new PreconditionFailedException('the parameter to identify the code of the product type must exist and be configured correctly "PRODUCT_TYPE_MENUS".');
    }

    const { companyUuid, productId } = removeAssignedCategoriesFromMenuProductInput;

    const product = await this.productsService.findOne({ companyUuid, id: productId });

    if (!product) {
      throw new NotFoundException(`can't get the product ${productId} for the company ${companyUuid}.`);
    }

    const productType = await this.productTypesService.findOne({ id: +product.productType });

    if (productTypeMenu.value !== productType.code) {
      throw new PreconditionFailedException('you can only remove category assigned to menu type products.');
    }

    const assignedCategories = await this.assignedCategoryRepository.createQueryBuilder('ac')
      .select('ac.id')
      .innerJoin('ac.category', 'c')
      .innerJoin('c.menu', 'm')
      .innerJoin('m.venue', 'v')
      .innerJoin('v.company', 'c1')
      .where('c1.uuid = :companyUuid', { companyUuid })
      .andWhere('ac.product_id = :productId', { productId })
      .getMany();

    const ids = assignedCategories.map(assignedCategory => (assignedCategory.id));

    if (ids.length === 0) throw new NotFoundException(`there are no categories assigned for product ${productId} for the company with uuid ${companyUuid}.`);

    await this.assignedCategoryRepository.createQueryBuilder()
      .delete()
      .whereInIds(ids)
      .execute();

    return 'OK';
  }
}
