import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { Order } from './entities/order.entity';
import { PersonsModule } from '../persons/persons.module';
import { SpotsModule } from '../spots/spots.module';
import { OrderStatusesModule } from '../order-statuses/order-statuses.module';
import { OrderLoaders } from './orders.loaders';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    PersonsModule,
    SpotsModule,
    OrderStatusesModule
  ],
  providers: [OrderLoaders, OrdersResolver, OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
