import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { Order } from './entities/order.entity';
import { PersonsModule } from '../persons/persons.module';
import { SpotsModule } from '../spots/spots.module';
import { OrderStatusesModule } from '../order-statuses/order-statuses.module';
import { RequestsModule } from '../requests/requests.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]),
    forwardRef(() => PersonsModule),
    forwardRef(() => SpotsModule),
    forwardRef(() => OrderStatusesModule),
    forwardRef(() => RequestsModule)],
  providers: [OrdersResolver, OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
