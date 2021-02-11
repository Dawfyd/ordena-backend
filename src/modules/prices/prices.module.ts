import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesService } from './prices.service';
import { PricesResolver } from './prices.resolver';
import { Price } from './entities/price.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Price]),
    forwardRef(() => ProductsModule)],
  providers: [PricesResolver, PricesService],
  exports: [PricesService]
})
export class PricesModule {}
