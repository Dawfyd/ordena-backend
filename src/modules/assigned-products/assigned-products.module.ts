import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignedProductsService } from './assigned-products.service';
import { AssignedProductsResolver } from './assigned-products.resolver';
import { AssignedProduct } from './entities/assigned-product.entity';
import { ProductsModule } from '../products/products.module';
import { ParametersModule } from '../parameters/parameters.module';
import { AssignedProductsLoaders } from './assigned-products.loaders';
import { ProductTypesModule } from '../product-types/product-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssignedProduct]),
    ProductsModule,
    ParametersModule,
    ProductTypesModule
  ],
  providers: [AssignedProductsResolver, AssignedProductsLoaders, AssignedProductsService],
  exports: [AssignedProductsService]
})
export class AssignedProductsModule {}
