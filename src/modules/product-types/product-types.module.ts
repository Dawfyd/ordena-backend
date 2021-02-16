import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypesService } from './product-types.service';
import { ProductTypesResolver } from './product-types.resolver';
import { ProductType } from './entities/product-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType])],
  providers: [ProductTypesResolver, ProductTypesService],
  exports: [ProductTypesService]
})
export class ProductTypesModule {}
