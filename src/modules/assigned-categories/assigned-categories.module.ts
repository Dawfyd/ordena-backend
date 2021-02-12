import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignedCategoriesService } from './assigned-categories.service';
import { AssignedCategoriesResolver } from './assigned-categories.resolver';
import { AssignedCategory } from './entities/assigned-category.entity';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';
import { ParametersModule } from '../parameters/parameters.module';
import { ProductTypesModule } from '../product-types/product-types.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssignedCategory]),
    ProductsModule,
    forwardRef(() => CategoriesModule),
    ParametersModule],
  providers: [AssignedCategoriesResolver, AssignedCategoriesService],
  exports: [AssignedCategoriesService]
})
export class AssignedCategoriesModule {}
