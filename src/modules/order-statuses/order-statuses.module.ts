import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderStatusesService } from './order-statuses.service';
import { OrderStatusesResolver } from './order-statuses.resolver';

import { OrderStatus } from './entities/order-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatus])],
  providers: [OrderStatusesResolver, OrderStatusesService],
  exports: [OrderStatusesService]
})
export class OrderStatusesModule {}
