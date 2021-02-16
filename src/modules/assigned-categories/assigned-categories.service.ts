import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { ParametersService } from '../parameters/parameters.service';
import { ProductsService } from '../products/products.service';
import { CreateAssignedCategoryMenuInput } from './dto/create-assigned-category-menu.input';
import { CreateAssignedCategoryInput } from './dto/create-assigned-category.input';
import { UpdateAssignedCategoryInput } from './dto/update-assigned-category.input';
import { AssignedCategory } from './entities/assigned-category.entity';

@Injectable()
export class AssignedCategoriesService {
  constructor (
    @InjectRepository(AssignedCategory)
    private readonly AssignedCategoryRepository: Repository<AssignedCategory>,
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly parametersService: ParametersService
  ) {}

  async assingCategoryToCategoryProduct (createAssignedCategoryInput: CreateAssignedCategoryInput): Promise<AssignedCategory> {
    const productTypeCategory = await this.parametersService.findOneName('PRODUCT_TYPE_ASSIGNED_CATEGORIES');

    if (!productTypeCategory) {
      throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_ASSIGNED_CATEGORIES".');
    }

    const { product_id, category_id } = createAssignedCategoryInput;
    // TODO: fix
    const product = {};

    // TODO: fix
    if (productTypeCategory.value !== 'product.productType.code') {
      throw new PreconditionFailedException(`Solo se pueden asignar productos de tipo ${productTypeCategory.value}`);
    }

    const category = await this.categoriesService.findOne(category_id);

    const newAssignedCategory = this.AssignedCategoryRepository.create({
      product,
      category
    });

    return await this.AssignedCategoryRepository.save(newAssignedCategory);
  }

  async assingCategoriesToMenuProduct (createAssignedCategoryMenuInput: CreateAssignedCategoryMenuInput): Promise<string> {
    const productTypeMenu = await this.parametersService.findOneName('PRODUCT_TYPE_MENUS');

    if (!productTypeMenu) {
      throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_MENUS".');
    }

    const { product_id } = createAssignedCategoryMenuInput;
    // TODO: fix
    const product = {};

    // TODO: fix
    if (productTypeMenu.value !== 'product.productType.code') {
      throw new PreconditionFailedException(`Solo se pueden asignar productos de tipo ${productTypeMenu.value}`);
    }

    const categories = await this.categoriesService.findAll();

    const data = categories.map(category => ({ category, product }));

    await this.AssignedCategoryRepository.createQueryBuilder()
      .insert()
      .into(AssignedCategory)
      .values(data)
      .execute();

    return 'OK';
  }

  async findAll (): Promise<AssignedCategory[]> {
    return await this.AssignedCategoryRepository.find();
  }

  async findOne (id: number): Promise<AssignedCategory> {
    const assignedCategory = await this.AssignedCategoryRepository.findOne(id);
    if (!assignedCategory) throw new NotFoundException('No hay un categoria asignada con esa ID');
    return assignedCategory;
  }

  async findProductsCategory (category: number): Promise<AssignedCategory[]> {
    return await this.AssignedCategoryRepository.find({
      where: {
        category
      }
    });
  }

  async update (id: number, updateAssignedCategoryInput: UpdateAssignedCategoryInput): Promise<AssignedCategory> {
    const assignedCategory = await this.findOne(id);

    const { product_id, category_id } = updateAssignedCategoryInput;
    // TODO: fix
    const product = {};
    const category = await this.categoriesService.findOne(category_id);

    const editedAssignedCategory = this.AssignedCategoryRepository.merge(assignedCategory, {
      product,
      category
    });

    return await this.AssignedCategoryRepository.save(editedAssignedCategory);
  }

  async remove (id: number): Promise<AssignedCategory> {
    const assignedCategory = await this.findOne(id);
    return await this.AssignedCategoryRepository.remove(assignedCategory);
  }
}
