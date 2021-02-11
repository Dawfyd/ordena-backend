import { forwardRef, Module } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { SpotsResolver } from './spots.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spot } from './entities/spot.entity';
import { VenuesModule } from '../venues/venues.module';
import { CustomerAssignedSpotsModule } from '../customer-assigned-spots/customer-assigned-spots.module';
import { OrdersModule } from '../orders/orders.module';
import { RequestsModule } from '../requests/requests.module';

@Module({
  imports: [TypeOrmModule.forFeature([Spot]),
    forwardRef(() => VenuesModule ),
    forwardRef(()=> CustomerAssignedSpotsModule),
    forwardRef(() => OrdersModule),
    forwardRef(() => RequestsModule)],
  providers: [SpotsResolver, SpotsService],
  exports: [SpotsService]
})
export class SpotsModule {}
