import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { ProductsService } from '../products/products.service';
import { CreateAssignedCategoryInput } from './dto/create-assigned-category.input';
import { UpdateAssignedCategoryInput } from './dto/update-assigned-category.input';
import { AssignedCategory } from './entities/assigned-category.entity';

@Injectable()
export class AssignedCategoriesService {
  constructor(
    @InjectRepository(AssignedCategory)
    private readonly AssignedCategoryRepository: Repository<AssignedCategory>,
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createAssignedCategoryInput: CreateAssignedCategoryInput): Promise<AssignedCategory> {
    const { product_id, category_id } = createAssignedCategoryInput;

    const product = await this.productsService.findOne(product_id);
    const category = await this.categoriesService.findOne(category_id);

    const newAssignedCategory = this.AssignedCategoryRepository.create({
      product,
      category
    });

    return await this.AssignedCategoryRepository.save(newAssignedCategory);
  }

  async findAll(): Promise<AssignedCategory[]> {
    return await this.AssignedCategoryRepository.find();
  }

  async findOne(id: number): Promise<AssignedCategory> {
    const assignedCategory = await this.AssignedCategoryRepository.findOne(id);
    if (!assignedCategory) throw new NotFoundException('No hay un categoria asignada con esa ID');
    return assignedCategory;
  }

  async findCategoriesProduct(product: number): Promise<AssignedCategory[]> {
    return await this.AssignedCategoryRepository.find({
      where: {
        product
      }
    });
  }

  async findProductsCategory(category: number): Promise<AssignedCategory[]> {
    return await this.AssignedCategoryRepository.find({
      where: {
        category
      }
    });
  }

  async update(id: number, updateAssignedCategoryInput: UpdateAssignedCategoryInput): Promise<AssignedCategory> {
    const assignedCategory = await this.findOne(id);

    const { product_id, category_id } = updateAssignedCategoryInput;

    const product = await this.productsService.findOne(product_id);
    const category = await this.categoriesService.findOne(category_id);

    const editedAssignedCategory = this.AssignedCategoryRepository.merge(assignedCategory, {
      product,
      category
    });

    return await this.AssignedCategoryRepository.save(editedAssignedCategory);
  }

  async remove(id: number): Promise<AssignedCategory> {
    const assignedCategory = await this.findOne(id);
    return await this.AssignedCategoryRepository.remove(assignedCategory);
  }
}
