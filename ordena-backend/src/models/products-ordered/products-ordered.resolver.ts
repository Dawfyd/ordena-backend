import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsOrderedService } from './products-ordered.service';
import { ProductsOrdered } from './entities/products-ordered.entity';
import { CreateProductsOrderedInput } from './dto/create-products-ordered.input';
import { UpdateProductsOrderedInput } from './dto/update-products-ordered.input';

@Resolver(() => ProductsOrdered)
export class ProductsOrderedResolver {
  constructor(
    private readonly productsOrderedService: ProductsOrderedService,
  ) {}

  @Mutation(() => ProductsOrdered)
  createProductsOrdered(
    @Args('createProductsOrderedInput')
    createProductsOrderedInput: CreateProductsOrderedInput,
  ) {
    return this.productsOrderedService.create(createProductsOrderedInput);
  }

  @Query(() => [ProductsOrdered], { name: 'productsOrdered' })
  findAll() {
    return this.productsOrderedService.findAll();
  }

  @Query(() => ProductsOrdered, { name: 'productsOrdered' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsOrderedService.findOne(id);
  }

  @Mutation(() => ProductsOrdered)
  updateProductsOrdered(
    @Args('updateProductsOrderedInput')
    updateProductsOrderedInput: UpdateProductsOrderedInput,
  ) {
    return this.productsOrderedService.update(
      updateProductsOrderedInput.id_product_ordered,
      updateProductsOrderedInput,
    );
  }

  @Mutation(() => ProductsOrdered)
  removeProductsOrdered(@Args('id', { type: () => Int }) id: number) {
    return this.productsOrderedService.remove(id);
  }
}
