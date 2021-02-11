import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ProductTypesService } from './product-types.service';
import { ProductType } from './entities/product-type.entity';
import { CreateProductTypeInput } from './dto/create-product-type.input';
import { UpdateProductTypeInput } from './dto/update-product-type.input';
import { ProductsService } from '../products/products.service';

@Resolver(() => ProductType)
export class ProductTypesResolver {
  constructor(private readonly productTypesService: ProductTypesService,
    private readonly productsService: ProductsService) {}

  @Mutation(() => ProductType)
  createProductType(@Args('createProductTypeInput') createProductTypeInput: CreateProductTypeInput) {
    return this.productTypesService.create(createProductTypeInput);
  }

  @Query(() => [ProductType], { name: 'productTypes' })
  findAll() {
    return this.productTypesService.findAll();
  }

  @Query(() => ProductType, { name: 'productType' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productTypesService.findOne(id);
  }

  @Mutation(() => ProductType)
  updateProductType(@Args('updateProductTypeInput') updateProductTypeInput: UpdateProductTypeInput) {
    return this.productTypesService.update(updateProductTypeInput.id, updateProductTypeInput);
  }

  @Mutation(() => ProductType)
  removeProductType(@Args('id', { type: () => Int }) id: number) {
    return this.productTypesService.remove(id);
  }

  @ResolveField()
  async Products(@Parent() productType: ProductType) {
    const { id } = productType;
    return this.productsService.findProductsType(id);
  }
}
