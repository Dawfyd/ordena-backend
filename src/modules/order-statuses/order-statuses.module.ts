import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusesService } from './order-statuses.service';
import { OrderStatusesResolver } from './order-statuses.resolver';
import { OrderStatus } from './entities/order-status.entity';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatus]),
    forwardRef(() => OrdersModule)],
  providers: [OrderStatusesResolver, OrderStatusesService],
  exports: [OrderStatusesService]
})
export class OrderStatusesModule {}
