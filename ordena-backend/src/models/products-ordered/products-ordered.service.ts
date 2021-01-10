import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductsOrderedInput } from './dto/create-products-ordered.input';
import { UpdateProductsOrderedInput } from './dto/update-products-ordered.input';
import { ProductsOrdered } from './entities/products-ordered.entity';

@Injectable()
export class ProductsOrderedService {
  constructor(
    @InjectRepository(ProductsOrdered)
    private readonly ProductsOrderedRepository: Repository<ProductsOrdered>,
  ) {}

  async create(
    createProductsOrderedInput: CreateProductsOrderedInput,
  ): Promise<ProductsOrdered> {
    const newProductsOrdered = this.ProductsOrderedRepository.create(
      createProductsOrderedInput,
    );
    return await this.ProductsOrderedRepository.save(newProductsOrdered);
  }

  async findAll(): Promise<ProductsOrdered[]> {
    return await this.ProductsOrderedRepository.find();
  }

  async findOne(id: number): Promise<ProductsOrdered> {
    const product_ordered = await this.ProductsOrderedRepository.findOne(id);
    if (!product_ordered)
      throw new NotFoundException('No hay un producto ordenado con esa ID');
    return product_ordered;
  }

  async update(
    id: number,
    updateProductsOrderedInput: UpdateProductsOrderedInput,
  ) {
    const product_ordered = await this.ProductsOrderedRepository.findOne(id);
    if (!product_ordered)
      throw new NotFoundException('No hay un producto ordenado con esa ID');

    const editedProductsOrdered = Object.assign(
      product_ordered,
      updateProductsOrderedInput,
    );
    return await this.ProductsOrderedRepository.save(editedProductsOrdered);
  }

  async remove(id: number) {
    const product_ordered = await this.ProductsOrderedRepository.findOne(id);
    if (!product_ordered)
      throw new NotFoundException('No hay un producto ordenado con esa ID');
    return await this.ProductsOrderedRepository.remove(product_ordered);
  }
}
