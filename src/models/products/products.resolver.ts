import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { FavoritesService } from '../favorites/favorites.service';
import { AssignedCategoriesService } from '../assigned-categories/assigned-categories.service';
import { PricesService } from '../prices/prices.service';
import { ModifiersService } from '../modifiers/modifiers.service';
import { AssignedProductsService } from '../assigned-products/assigned-products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService,
    private readonly favoritesService: FavoritesService,
    private readonly assignedCategoriesService: AssignedCategoriesService,
    private readonly pricesService: PricesService,
    private readonly modifiersService: ModifiersService,
    private readonly assignedProductsService: AssignedProductsService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }

  @ResolveField()
  async favorites(@Parent() product: Product) {
    const { id } = product;
    return this.favoritesService.findFavoritesProduct(id);
  }

  @ResolveField()
  async assignedCategories(@Parent() product: Product) {
    const { id } = product;
    return this.assignedCategoriesService.findCategoriesProduct(id);
  }

  @ResolveField()
  async prices(@Parent() product: Product) {
    const { id } = product;
    return this.pricesService.findPriceProduct(id);
  }

  @ResolveField()
  async modifiers(@Parent() product: Product) {
    const { id } = product;
    return this.modifiersService.findModifierProduct(id);
  }

  async parentProducts(@Parent() product: Product) {
    const { id } = product;
    return this.assignedProductsService.findProductsParent(id);
  }

  @ResolveField()
  async assignedProducts(@Parent() product: Product) {
    const { id } = product;
    return this.assignedProductsService.findProductsAssigned(id);
  }
}
