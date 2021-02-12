import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParametersService } from '../parameters/parameters.service';
import { ProductsService } from '../products/products.service';
import { CreateAssignedProductInput } from './dto/create-assigned-product.input';
import { UpdateAssignedProductInput } from './dto/update-assigned-product.input';
import { AssignedProduct } from './entities/assigned-product.entity';

@Injectable()
export class AssignedProductsService {
  constructor (
    @InjectRepository(AssignedProduct)
    private readonly AssignedProductRepository: Repository<AssignedProduct>,
    private readonly productsService: ProductsService,
    private readonly parametersService: ParametersService
  ) {}

  async assingProductToProduct (createAssignedProductInput: CreateAssignedProductInput): Promise<AssignedProduct> {
    const productTypeProduct = await this.parametersService.findOneName('PRODUCT_TYPE_ASSIGNED_PRODUCTS');

    if (!productTypeProduct) {
      throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_ASSIGNED_PRODUCTS".');
    }

    const productTypePure = await this.parametersService.findOneName('PRODUCT_TYPE_PURE');

    if (!productTypePure) {
      throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_PURE".');
    }

    const { parent_id, assigned_id } = createAssignedProductInput;

    const parent = await this.productsService.findOne(parent_id);

    if (productTypePure.value !== parent.productType.code) {
      throw new PreconditionFailedException(`Para parent solo se pueden asignar productos de tipo ${productTypePure.value}`);
    }

    const assigned = await this.productsService.findOne(assigned_id);

    if (productTypeProduct.value !== assigned.productType.code) {
      throw new PreconditionFailedException(`Para assigned solo se pueden asignar productos de tipo ${productTypeProduct.value}`);
    }

    const newProductsService = this.AssignedProductRepository.create({
      parent,
      assigned
    });

    return await this.AssignedProductRepository.save(newProductsService);
  }

  async findAll (): Promise<AssignedProduct[]> {
    return await this.AssignedProductRepository.find();
  }

  async findOne (id: number): Promise<AssignedProduct> {
    const assignedProduct = await this.AssignedProductRepository.findOne(id);
    if (!assignedProduct) throw new NotFoundException('No hay un producto asignado con esa ID');
    return assignedProduct;
  }

  async findProductsParent (parent: number): Promise<AssignedProduct[]> {
    return await this.AssignedProductRepository.find({
      where: {
        parent
      }
    });
  }

  async findProductsAssigned (assigned: number): Promise<AssignedProduct[]> {
    return await this.AssignedProductRepository.find({
      where: {
        assigned
      }
    });
  }

  async update (id: number, updateAssignedProductInput: UpdateAssignedProductInput): Promise<AssignedProduct> {
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

  async remove (id: number): Promise<AssignedProduct> {
    const assignedProduct = await this.findOne(id);
    return await this.AssignedProductRepository.remove(assignedProduct);
  }
}
