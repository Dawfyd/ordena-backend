import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { ProductsInVenue } from './entities/products-in-venue.entity';
import { ProductsInVenueService } from './products-in-venue.service';

import { Venue } from '../venues/entities/venue.entity';

import { ProductsInVenueLoaders } from './products-in-venue.loaders';
import { Product } from '../products/entities/product.entity';

import { FindAllProductsInVenueInput } from './dto/find-all-products-in-venue-input.dto';
import { FindOneProductsInVenueInput } from './dto/find-one-products-in-venue-input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => ProductsInVenue)
export class ProductsInVenueResolver {
  constructor (
    private readonly service: ProductsInVenueService,
    private readonly productsInVenueLoaders: ProductsInVenueLoaders
  ) {}

  @Query(() => [ProductsInVenue], { name: 'productsInVenue' })
  findAll (@Args('findAllProductInput') findAllProductsInVenueInput: FindAllProductsInVenueInput): Promise<ProductsInVenue[]> {
    return this.service.findAll(findAllProductsInVenueInput);
  }

  @Query(() => ProductsInVenue, { name: 'productInVenue', nullable: true })
  findOne (@Args('findOneProductInput') findOneProductsInVenueInput: FindOneProductsInVenueInput): Promise<ProductsInVenue> {
    return this.service.findOne(findOneProductsInVenueInput);
  }

  @ResolveField(() => Venue, { name: 'venue' })
  venue (@Parent() productsInVenue: ProductsInVenue): Promise<Venue> {
    const venueValue: any = productsInVenue.venue;

    let venueId = venueValue;

    if (typeof venueId !== 'number') venueId = venueValue.id;

    return this.productsInVenueLoaders.batchVenues.load(venueId);
  }

  @ResolveField(() => Product, { name: 'product' })
  product (@Parent() productsInVenue: ProductsInVenue): Promise<Product> {
    const productValue: any = productsInVenue.product;

    let productId = productValue;

    if (typeof productId !== 'number') productId = productValue.id;

    return this.productsInVenueLoaders.batchProducts.load(productId);
  }
}
