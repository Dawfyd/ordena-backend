import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductTypesService } from '../product-types/product-types.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,
    private readonly ProductTypesService: ProductTypesService
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const { product_type_id } = createProductInput;

    const productType = await this.ProductTypesService.findOne(product_type_id);

    const newProduct = this.ProductRepository.create({
      ...createProductInput,
      productType
    });

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

  async findProductsType(productType: number): Promise<Product[]> {
    return await this.ProductRepository.find({
      where: {
        productType
      }
    });
  }

  async update(id: number, updateProductInput: UpdateProductInput): Promise<Product> {
    const product = await this.findOne(id);

    const { product_type_id } = updateProductInput;

    const productType = await this.ProductTypesService.findOne(product_type_id);

    const editedProduct = this.ProductRepository.merge(product, {
      ...updateProductInput,
      productType
    });
    return await this.ProductRepository.save(editedProduct);
  }

  async remove(id: number): Promise<Product> {
    const product = await this.findOne(id);
    return await this.ProductRepository.remove(product);
  }
}
