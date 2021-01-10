import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const newProduct = this.ProductRepository.create(createProductInput);
    return await this.ProductRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return await this.ProductRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.ProductRepository.findOne(id);
    if (!product) throw new NotFoundException('No hay un producto con esa ID');
    return product;
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    const product = await this.ProductRepository.findOne(id);
    if (!product) throw new NotFoundException('No hay un producto con esa ID');

    const editedProduct = Object.assign(product, updateProductInput);
    return await this.ProductRepository.save(editedProduct);
  }

  async remove(id: number) {
    const product = await this.ProductRepository.findOne(id);
    if (!product) throw new NotFoundException('No hay un producto con esa ID');
    return await this.ProductRepository.remove(product);
  }
}
