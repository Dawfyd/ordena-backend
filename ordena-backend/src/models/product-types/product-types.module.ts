import { forwardRef, Module } from '@nestjs/common';
import { ProductTypesService } from './product-types.service';
import { ProductTypesResolver } from './product-types.resolver';
import { ProductType } from './entities/product-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType]),
  forwardRef(() => ProductsModule)],
  providers: [ProductTypesResolver, ProductTypesService],
  exports: [ProductTypesService]
})
export class ProductTypesModule {}
