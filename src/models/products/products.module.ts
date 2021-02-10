import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FavoritesModule } from '../favorites/favorites.module';
import { AssignedCategoriesModule } from '../assigned-categories/assigned-categories.module';
import { ProductTypesModule } from '../product-types/product-types.module';
import { PricesModule } from '../prices/prices.module';
import { ModifiersModule } from '../modifiers/modifiers.module';
import { AssignedProductsModule } from '../assigned-products/assigned-products.module';
import { RequestsModule } from '../requests/requests.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),
  forwardRef(() => FavoritesModule),
  forwardRef(() => AssignedCategoriesModule),
  forwardRef(() => ProductTypesModule),
  forwardRef(() => PricesModule),
  forwardRef(() => ModifiersModule),
  forwardRef(() => AssignedProductsModule),
  forwardRef(() => RequestsModule)],
  providers: [ProductsResolver, ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
