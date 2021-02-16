import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ProductsInVenue } from './entities/products-in-venue.entity';
import { ProductsInVenueService } from './products-in-venue.service';

import { FindAllProductsInVenueInput } from './dto/find-all-products-in-venue-input.dto';
import { FindOneProductsInVenueInput } from './dto/find-one-products-in-venue-input.dto';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => ProductsInVenue)
export class ProductsInVenueResolver {
  constructor (
    private readonly service: ProductsInVenueService
  ) {}

  @Query(() => [ProductsInVenue], { name: 'productsInVenue' })
  findAll (@Args('findAllProductInput') findAllProductsInVenueInput: FindAllProductsInVenueInput): Promise<ProductsInVenue[]> {
    return this.service.findAll(findAllProductsInVenueInput);
  }

  @Query(() => ProductsInVenue, { name: 'productInVenue', nullable: true })
  findOne (@Args('findOneProductInput') findOneProductsInVenueInput: FindOneProductsInVenueInput): Promise<ProductsInVenue> {
    return this.service.findOne(findOneProductsInVenueInput);
  }
}
