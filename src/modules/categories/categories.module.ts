import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { Category } from './entities/category.entity';
import { MenusModule } from '../menus/menus.module';
import { AssignedCategoriesModule } from '../assigned-categories/assigned-categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]),
    forwardRef(() => MenusModule),
    forwardRef(() => AssignedCategoriesModule)],
  providers: [CategoriesResolver, CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
