import { Module } from '@nestjs/common';
import { ProductsOrderedService } from './products-ordered.service';
import { ProductsOrderedResolver } from './products-ordered.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsOrdered } from './entities/products-ordered.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsOrdered])
  ],
  providers: [ProductsOrderedResolver, ProductsOrderedService]
})
export class ProductsOrderedModule {}
