import { forwardRef, Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsResolver } from './persons.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { FavoritesModule } from '../favorites/favorites.module';
import { BasicAclModule } from 'src/common/integrations/basic-acl/basic-acl.module';
import { ParametersModule } from '../parameters/parameters.module';
import { CustomerAssignedSpotsModule } from '../customer-assigned-spots/customer-assigned-spots.module';
import { AssignedVenuesModule } from '../assigned-venues/assigned-venues.module';
import { WaiterAssignedSpotsModule } from '../waiter-assigned-spots/waiter-assigned-spots.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([Person]),
    BasicAclModule, ParametersModule],
  forwardRef(() => FavoritesModule),
  forwardRef(() => CustomerAssignedSpotsModule),
  forwardRef(() => AssignedVenuesModule),
  forwardRef(() => WaiterAssignedSpotsModule),
  forwardRef(() => OrdersModule)],
  providers: [PersonsResolver, PersonsService],
  exports: [PersonsService]
})
export class PersonsModule {}
