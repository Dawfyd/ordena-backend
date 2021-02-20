import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';

import { Price } from './entities/price.entity';
import { Venue } from '../venues/entities/venue.entity';
import { Product } from '../products/entities/product.entity';

import { PricesService } from './prices.service';
import { PricesLoaders } from './prices.loaders';

import { CreatePriceInput } from './dto/create-price-input.dto';
import { UpdatePriceInput } from './dto/update-price-input.dto';
import { FindAllPricesInput } from './dto/find-all-proces-input.dto';
import { FindOnePriceInput } from './dto/find-one-price-input.dto';
@Resolver(() => Price)
export class PricesResolver {
  constructor (
    private readonly pricesService: PricesService,
    private readonly pricesLoaders: PricesLoaders
  ) {}

  @Mutation(() => Price, { name: 'createPrice' })
  create (@Args('createPriceInput') createPriceInput: CreatePriceInput): Promise<Price> {
    return this.pricesService.create(createPriceInput);
  }

  @Query(() => [Price], { name: 'prices' })
  findAll (@Args('findAllPricesInput') findAllPricesInput: FindAllPricesInput): Promise<Price[]> {
    return this.pricesService.findAll(findAllPricesInput);
  }

  @Query(() => Price, { name: 'price' })
  findOne (@Args('findOnePriceInput') findOnePriceInput: FindOnePriceInput): Promise<Price> {
    return this.pricesService.findOne(findOnePriceInput);
  }

  @Mutation(() => Price)
  updatePrice (
    @Args('findOnePriceInput') findOnePriceInput: FindOnePriceInput,
    @Args('updatePriceInput') updatePriceInput: UpdatePriceInput
  ): Promise<Price> {
    return this.pricesService.update(findOnePriceInput, updatePriceInput);
  }

  @Mutation(() => Price)
  removePrice (@Args('findOnePriceInput') findOnePriceInput: FindOnePriceInput): Promise<Price> {
    return this.pricesService.remove(findOnePriceInput);
  }

  @ResolveField(() => Venue, { name: 'venue' })
  venue (@Parent() price: Price): Promise<Venue> {
    const value: any = price.venue;

    let id = value;

    if (typeof id !== 'number') id = value.id;

    return this.pricesLoaders.batchVenues.load(id);
  }

  @ResolveField(() => Product, { name: 'product' })
  product (@Parent() price: Price): Promise<Product> {
    const value: any = price.product;

    let id = value;

    if (typeof id !== 'number') id = value.id;

    return this.pricesLoaders.batchProducts.load(id);
  }
}
