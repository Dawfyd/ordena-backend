import { forwardRef, Module } from '@nestjs/common';
import { AssignedCategoriesService } from './assigned-categories.service';
import { AssignedCategoriesResolver } from './assigned-categories.resolver';
import { AssignedCategory } from './entities/assigned-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssignedCategory]),
    forwardRef(() => ProductsModule),
    forwardRef(() => CategoriesModule)],
  providers: [AssignedCategoriesResolver, AssignedCategoriesService],
  exports: [AssignedCategoriesService]
})
export class AssignedCategoriesModule {}
