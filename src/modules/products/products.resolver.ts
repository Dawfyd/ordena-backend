import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { GraphQLUpload } from 'apollo-server-express';

import { Product } from './entities/product.entity';
import { ProductType } from '../product-types/entities/product-type.entity';
import { Favorite } from '../favorites/entities/favorite.entity';
import { AssignedCategory } from '../assigned-categories/entities/assigned-category.entity';
import { Price } from '../prices/entities/price.entity';
import { Modifier } from '../modifiers/entities/modifier.entity';
import { AssignedProduct } from '../assigned-products/entities/assigned-product.entity';
import { Request } from '../requests/entities/request.entity';
import { AdditionalsPerRequest } from '../additionals-per-requests/entities/additionals-per-request.entity';
import { Category } from '../categories/entities/category.entity';

import { ProductsLoaders } from './products.loaders';

import { ProductsService } from './products.service';

import { CreateProductInput } from './dto/create-product.input.dto';
import { UpdateProductInput } from './dto/update-product.input.dto';
import { FindAllProductInput } from './dto/find-all-product-input.dto';
import { FindOneProductInput } from './dto/find-one-product-input.dto';
import { CreateProductPureInput } from './dto/create-product-pure-input.dto';
import { UpdateCategoryPureProductInput } from './dto/update-category-pure-product-input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => Product)
export class ProductsResolver {
  constructor (
    private readonly service: ProductsService,
    private readonly productsLoaders: ProductsLoaders
  ) {}

  @Mutation(() => Product, { name: 'createMenuProduct' })
  createMenuProduct (@Args('createProductInput') createProductInput: CreateProductInput): Promise<Product> {
    return this.service.createMenuProduct(createProductInput);
  }

  @Mutation(() => Product, { name: 'createCategoryProduct' })
  createCategoryProduct (@Args('createProductInput') createProductInput: CreateProductInput): Promise<Product> {
    return this.service.createCategoryProduct(createProductInput);
  }

  @Mutation(() => Product, { name: 'createPureProduct' })
  createPureProduct (@Args('createProductPureInput') createProductPureInput: CreateProductPureInput): Promise<Product> {
    return this.service.createPureProduct(createProductPureInput);
  }

  @Mutation(() => Product, { name: 'createProductAssignedProduct' })
  createProductAssignedProduct (@Args('createProductInput') createProductInput: CreateProductInput): Promise<Product> {
    return this.service.createProductAssignedProduct(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll (@Args('findAllProductInput') findAllProductInput: FindAllProductInput): Promise<Product[]> {
    return this.service.findAll(findAllProductInput);
  }

  @Query(() => Product, { name: 'product', nullable: true })
  findOne (@Args('findOneProductInput') findOneProductInput: FindOneProductInput): Promise<Product> {
    return this.service.findOne(findOneProductInput);
  }

  @Mutation(() => Product, { name: 'updateProduct' })
  update (
    @Args('findOneProductInput') findOneProductInput: FindOneProductInput,
    @Args('updateProductInput') updateProductInput: UpdateProductInput
  ): Promise<Product> {
    return this.service.update(findOneProductInput, updateProductInput);
  }

  @Mutation(() => Product, { name: 'updateCategoryPureProduct' })
  updateCategoryPureProduct (
    @Args('findOneProductInput') findOneProductInput: FindOneProductInput,
    @Args('updateCategoryPureProductInput') updateCategoryPureProductInput: UpdateCategoryPureProductInput
  ): Promise<Product> {
    return this.service.updateCategoryPureProduct(findOneProductInput, updateCategoryPureProductInput);
  }

  @Mutation(() => Product, { name: 'removeProduct' })
  remove (@Args('findOneProductInput') findOneProductInput: FindOneProductInput): Promise<Product> {
    return this.service.remove(findOneProductInput);
  }

  @ResolveField(() => ProductType, { name: 'productType' })
  productType (@Parent() product: Product): Promise<ProductType> {
    const productTypeValue: any = product.productType;

    let productTypeId = productTypeValue;

    if (typeof productTypeId !== 'number') productTypeId = productTypeValue.id;

    return this.productsLoaders.batchProductTypes.load(productTypeId);
  }

  @ResolveField(() => Category, { name: 'category' })
  category (@Parent() product: Product): Promise<Category> {
    const categoryValue: any = product.category;

    let categoryId = categoryValue;

    if (!categoryId) return null;

    if (typeof categoryId !== 'number') categoryId = categoryValue.id;

    return this.productsLoaders.batchCategories.load(categoryId);
  }

  @ResolveField(() => [Favorite], { name: 'favorites' })
  async favorites (@Parent() product: Product): Promise<Favorite[]> {
    return this.service.favorites(product);
  }

  @ResolveField(() => [AssignedCategory], { name: 'assignedCategories' })
  async assignedCategories (@Parent() product: Product): Promise<AssignedCategory[]> {
    return this.service.assignedCategories(product);
  }

  @ResolveField(() => [Price], { name: 'prices' })
  async prices (@Parent() product: Product): Promise<Price[]> {
    return this.service.prices(product);
  }

  @ResolveField(() => [Modifier], { name: 'modifiers' })
  async modifiers (@Parent() product: Product): Promise<Modifier[]> {
    return this.service.modifiers(product);
  }

  @ResolveField(() => [AssignedProduct], { name: 'parentProducts' })
  async parentProducts (@Parent() product: Product): Promise<AssignedProduct[]> {
    return this.service.parentProducts(product);
  }

  @ResolveField(() => [AssignedProduct], { name: 'assignedProducts' })
  async assignedProducts (@Parent() product: Product): Promise<AssignedProduct[]> {
    return this.service.assignedProducts(product);
  }

  @ResolveField(() => [Request], { name: 'requests' })
  async requests (@Parent() product: Product): Promise<Request[]> {
    return this.service.requests(product);
  }

  @ResolveField(() => [AdditionalsPerRequest], { name: 'additionalsPerRequests' })
  async additionalsPerRequests (@Parent() product: Product): Promise<AdditionalsPerRequest[]> {
    return this.service.additionalsPerRequest(product);
  }

  @Mutation(() => Product, { name: 'uploadProductImage' })
  uploadImage (
    @Args('findOneProductInput') findOneProductInput: FindOneProductInput,
    @Args({ name: 'file', type: () => GraphQLUpload }) fileUpload: any
  ): Promise<Product> {
    return this.service.uploadImage(findOneProductInput, fileUpload);
  }
}
