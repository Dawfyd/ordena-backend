import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductTypeInput } from './dto/create-product-type.input';
import { UpdateProductTypeInput } from './dto/update-product-type.input';
import { ProductType } from './entities/product-type.entity';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductType)
    private readonly ProductTypeRepository: Repository<ProductType>
  ) {}

  async create(createProductTypeInput: CreateProductTypeInput): Promise<ProductType> {
    const newProductType = this.ProductTypeRepository.create(createProductTypeInput);
    return await this.ProductTypeRepository.save(newProductType);
  }

  async findAll(): Promise<ProductType[]> {
    return await this.ProductTypeRepository.find();
  }

  async findOne(id: number): Promise<ProductType> {
    const productType = await this.ProductTypeRepository.findOne(id);
    if (!productType) throw new NotFoundException('No hay un tipo de producto con esa ID');
    return productType;
  }

  async update(id: number, updateProductTypeInput: UpdateProductTypeInput): Promise<ProductType> {
    const productType = await this.findOne(id);

    const editedProductType = this.ProductTypeRepository.merge(productType, updateProductTypeInput);
    return await this.ProductTypeRepository.save(editedProductType);
  }

  async remove(id: number): Promise<ProductType> {
    const productType = await this.findOne(id);
    return await this.ProductTypeRepository.remove(productType);
  }
}
