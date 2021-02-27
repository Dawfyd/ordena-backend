import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import appConfig from '../../config/app.config';

import { Category } from './entities/category.entity';

import { CategoriesService } from './categories.service';
import { CategoriesLoaders } from './categories.loaders';
import { CategoriesResolver } from './categories.resolver';

import { MenusModule } from '../menus/menus.module';

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    TypeOrmModule.forFeature([Category]),
    MenusModule
  ],
  providers: [CategoriesService, CategoriesLoaders, CategoriesResolver],
  exports: [CategoriesService]
})
export class CategoriesModule {}
