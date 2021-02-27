import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { Product } from './entities/product.entity';
import { ProductTypesModule } from '../product-types/product-types.module';
import { ParametersModule } from '../parameters/parameters.module';
import { ProductsLoaders } from './products.loaders';
import { ProductsInVenueModule } from '../products-in-venue/products-in-venue.module';
import { VenuesModule } from '../venues/venues.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => ProductsInVenueModule),
    ProductTypesModule,
    ParametersModule,
    VenuesModule,
    CategoriesModule
  ],
  providers: [ProductsResolver, ProductsLoaders, ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
