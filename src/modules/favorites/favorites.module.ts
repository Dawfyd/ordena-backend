import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { FavoritesResolver } from './favorites.resolver';
import { Favorite } from './entities/favorite.entity';
import { PersonsModule } from '../persons/persons.module';
import { ProductsModule } from '../products/products.module';
import { FavoritesLoaders } from './favorites.loaders';
import { ParametersModule } from '../parameters/parameters.module';
import { ProductTypesModule } from '../product-types/product-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    PersonsModule,
    ProductsModule,
    ParametersModule,
    ProductTypesModule
  ],
  providers: [FavoritesResolver, FavoritesLoaders, FavoritesService],
  exports: [FavoritesService]
})
export class FavoritesModule {}
