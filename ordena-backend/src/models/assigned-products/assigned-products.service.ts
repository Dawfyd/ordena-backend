import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { CreateAssignedProductInput } from './dto/create-assigned-product.input';
import { UpdateAssignedProductInput } from './dto/update-assigned-product.input';
import { AssignedProduct } from './entities/assigned-product.entity';

@Injectable()
export class AssignedProductsService {
  constructor(
    @InjectRepository(AssignedProduct)
    private readonly AssignedProductRepository: Repository<AssignedProduct>,
    private readonly productsService: ProductsService
  ) {}

  async create(createAssignedProductInput: CreateAssignedProductInput): Promise<AssignedProduct> {
    const { parent_id, assigned_id } = createAssignedProductInput;

    const parent = await this.productsService.findOne(parent_id);
    const assigned = await this.productsService.findOne(assigned_id);

    const newProductsService = this.AssignedProductRepository.create({
      parent,
      assigned
    });

    return await this.AssignedProductRepository.save(newProductsService);
  }

  async findAll(): Promise<AssignedProduct[]> {
    return await this.AssignedProductRepository.find();
  }

  async findOne(id: number): Promise<AssignedProduct> {
    const assignedProduct = await this.AssignedProductRepository.findOne(id);
    if (!assignedProduct) throw new NotFoundException('No hay un producto asignado con esa ID');
    return assignedProduct;
  }

  async findProductsParent(parent: number): Promise<AssignedProduct[]> {
    return await this.AssignedProductRepository.find({
      where: {
        parent
      }
    });
  }

  async findProductsAssigned(assigned: number): Promise<AssignedProduct[]> {
    return await this.AssignedProductRepository.find({
      where: {
        assigned
      }
    });
  }

  async update(id: number, updateAssignedProductInput: UpdateAssignedProductInput): Promise<AssignedProduct> {
    const assignedProduct = await this.findOne(id);

    const { parent_id, assigned_id } = updateAssignedProductInput;

    const parent = await this.productsService.findOne(parent_id);
    const assigned = await this.productsService.findOne(assigned_id);

    const editedProductsService = this.AssignedProductRepository.merge(assignedProduct, {
      parent,
      assigned
    });

    return await this.AssignedProductRepository.save(editedProductsService);
  }

  async remove(id: number): Promise<AssignedProduct> {
    const assignedProduct = await this.findOne(id);
    return await this.AssignedProductRepository.remove(assignedProduct);
  }
}
