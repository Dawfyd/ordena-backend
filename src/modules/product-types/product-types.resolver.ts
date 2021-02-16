import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';

import { ProductType } from './entities/product-type.entity';
import { Product } from '../products/entities/product.entity';

import { ProductTypesService } from './product-types.service';

import { CreateProductTypeInput } from './dto/create-product-type.input.dto';
import { UpdateProductTypeInput } from './dto/update-product-type.input.dto';
import { FindAllProductTypeInput } from './dto/find-all-product-type-input.dto';
import { FindOneProductTypeInput } from './dto/find-one-product-type-input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => ProductType)
export class ProductTypesResolver {
  constructor (
    private readonly service: ProductTypesService
  ) {}

  @Mutation(() => ProductType, { name: 'createProductType' })
  create (@Args('createProductTypeInput') createProductTypeInput: CreateProductTypeInput): Promise<ProductType> {
    return this.service.create(createProductTypeInput);
  }

  @Query(() => [ProductType], { name: 'productTypes' })
  findAll (@Args('findAllProductTypeInput') findAllProductTypeInput: FindAllProductTypeInput): Promise<ProductType[]> {
    return this.service.findAll(findAllProductTypeInput);
  }

  @Query(() => ProductType, { name: 'productType', nullable: true })
  findOne (@Args('findOneProductTypeInput') findOneProductTypeInput: FindOneProductTypeInput): Promise<ProductType> {
    return this.service.findOne(findOneProductTypeInput);
  }

  @Mutation(() => ProductType, { name: 'updateProductType' })
  update (
    @Args('findOneProductTypeInput') findOneProductTypeInput: FindOneProductTypeInput,
    @Args('updateProductTypeInput') updateProductTypeInput: UpdateProductTypeInput
  ): Promise<ProductType> {
    return this.service.update(findOneProductTypeInput, updateProductTypeInput);
  }

  @Mutation(() => ProductType, { name: 'removeProductType' })
  removeProductType (@Args('findOneProductTypeInput') findOneProductTypeInput: FindOneProductTypeInput): Promise<ProductType> {
    return this.service.remove(findOneProductTypeInput);
  }

  @ResolveField(() => [Product], { name: 'products' })
  async products (@Parent() productType: ProductType): Promise<Product[]> {
    return this.service.products(productType);
  }
}
