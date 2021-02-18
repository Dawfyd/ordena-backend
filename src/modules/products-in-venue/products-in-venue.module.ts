import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsInVenue } from './entities/products-in-venue.entity';

import { ProductsInVenueService } from './products-in-venue.service';
import { ProductsInVenueResolver } from './products-in-venue.resolver';
import { VenuesModule } from '../venues/venues.module';
import { ProductsModule } from '../products/products.module';
import { ProductsInVenueLoaders } from './products-in-venue.loaders';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsInVenue]),
    VenuesModule,
    forwardRef(() => ProductsModule)
  ],
  providers: [ProductsInVenueResolver, ProductsInVenueLoaders, ProductsInVenueService],
  exports: [ProductsInVenueService]
})
export class ProductsInVenueModule {}
