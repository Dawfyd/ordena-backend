import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FavoritesModule } from '../favorites/favorites.module';
import { AssignedCategoriesModule } from '../assigned-categories/assigned-categories.module';
import { ProductTypesModule } from '../product-types/product-types.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),
  forwardRef(() => FavoritesModule),
  forwardRef(() => AssignedCategoriesModule),
  forwardRef(() => ProductTypesModule)],
  providers: [ProductsResolver, ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
