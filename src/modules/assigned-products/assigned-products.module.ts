import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignedProductsService } from './assigned-products.service';
import { AssignedProductsResolver } from './assigned-products.resolver';
import { AssignedProduct } from './entities/assigned-product.entity';
import { ProductsModule } from '../products/products.module';
import { ParametersModule } from '../parameters/parameters.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssignedProduct]),
    forwardRef(() => ProductsModule),
    ParametersModule],
  providers: [AssignedProductsResolver, AssignedProductsService],
  exports: [AssignedProductsService]
})
export class AssignedProductsModule {}
