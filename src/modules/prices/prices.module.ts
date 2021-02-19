import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Price } from './entities/price.entity';

import { PricesService } from './prices.service';
import { PricesLoaders } from './prices.loaders';
import { PricesResolver } from './prices.resolver';

import { ProductsModule } from '../products/products.module';
import { VenuesModule } from '../venues/venues.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Price]),
    ProductsModule,
    VenuesModule
  ],
  providers: [PricesService, PricesLoaders, PricesResolver],
  exports: [PricesService]
})
export class PricesModule {}
