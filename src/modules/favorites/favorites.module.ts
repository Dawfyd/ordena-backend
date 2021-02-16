import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { FavoritesResolver } from './favorites.resolver';
import { Favorite } from './entities/favorite.entity';
import { PersonsModule } from '../persons/persons.module';
import { ProductsModule } from '../products/products.module';
import { FavoritesLoaders } from './favorites.loaders';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    PersonsModule,
    forwardRef(() => ProductsModule)
  ],
  providers: [FavoritesResolver, FavoritesLoaders, FavoritesService],
  exports: [FavoritesService]
})
export class FavoritesModule {}
