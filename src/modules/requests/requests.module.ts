import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsService } from './requests.service';
import { RequestsResolver } from './requests.resolver';
import { Request } from './entities/request.entity';
import { ProductsModule } from '../products/products.module';
import { OrdersModule } from '../orders/orders.module';
import { SpotsModule } from '../spots/spots.module';
import { RequestStatusesModule } from '../request-statuses/request-statuses.module';
import { ModifiersPerRequestModule } from '../modifiers-per-request/modifiers-per-request.module';

@Module({
  imports: [TypeOrmModule.forFeature([Request]),
    forwardRef(() => ProductsModule),
    forwardRef(() => OrdersModule),
    forwardRef(() => SpotsModule),
    forwardRef(() => RequestStatusesModule),
    forwardRef(() => ModifiersPerRequestModule)],
  providers: [RequestsResolver, RequestsService],
  exports: [RequestsService]
})
export class RequestsModule {}
