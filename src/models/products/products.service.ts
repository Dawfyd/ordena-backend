import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParametersService } from '../parameters/parameters.service';
import { ProductTypesService } from '../product-types/product-types.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,
    private readonly ProductTypesService: ProductTypesService,
    private readonly parametersService: ParametersService
  ) {}

  async createMenuProduct(createProductInput: CreateProductInput): Promise<Product> {
    const productTypeMenu = await this.parametersService.findOneName("PRODUCT_TYPE_MENUS");

    if(!productTypeMenu){
      throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_MENUS".');
    }

    const productType = await this.ProductTypesService.findOneCode(productTypeMenu.value);

    const newProduct = this.ProductRepository.create({
      ...createProductInput,
      productType
    });

    return await this.ProductRepository.save(newProduct);
  }

  async createCategoryProduct(createProductInput: CreateProductInput): Promise<Product> {
    const productTypeCategory = await this.parametersService.findOneName("PRODUCT_TYPE_ASSIGNED_CATEGORIES");

    if(!productTypeCategory){
      throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_ASSIGNED_CATEGORIES".');
    }

    const productType = await this.ProductTypesService.findOneCode(productTypeCategory.value);

    const newProduct = this.ProductRepository.create({
      ...createProductInput,
      productType
    });

    return await this.ProductRepository.save(newProduct);
  }

  async createPureProduct(createProductInput: CreateProductInput): Promise<Product> {
    const productTypePure= await this.parametersService.findOneName("PRODUCT_TYPE_PURE");

    if(!productTypePure){
      throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_PURE".');
    }

    const productType = await this.ProductTypesService.findOneCode(productTypePure.value);

    const newProduct = this.ProductRepository.create({
      ...createProductInput,
      productType
    });

    return await this.ProductRepository.save(newProduct);
  }

  async createProductAssignedProduct(createProductInput: CreateProductInput): Promise<Product> {
    const productTypeProduct = await this.parametersService.findOneName("PRODUCT_TYPE_ASSIGNED_PRODUCTS");

    if(!productTypeProduct){
      throw new PreconditionFailedException('El parametro para identificar el código del (tipo de producto) debe existir y estar configurado correctamente "PRODUCT_TYPE_ASSIGNED_PRODUCTS".');
    }

    const productType = await this.ProductTypesService.findOneCode(productTypeProduct.value);

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

    const editedProduct = this.ProductRepository.merge(product, {
      ...updateProductInput
    });
    return await this.ProductRepository.save(editedProduct);
  }

  async remove(id: number): Promise<Product> {
    const product = await this.findOne(id);
    return await this.ProductRepository.remove(product);
  }
}
