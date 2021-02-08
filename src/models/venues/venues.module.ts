import { Module, forwardRef } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { VenuesResolver } from './venues.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from './entities/venue.entity';
import { CustomersModule } from '../customers/customers.module';
import { MenusModule } from '../menus/menus.module';

@Module({
  imports: [TypeOrmModule.forFeature([Venue]),
    forwardRef(() => CustomersModule),
    forwardRef(() => MenusModule)],
  providers: [VenuesResolver, VenuesService],
  exports: [VenuesService]
})
export class VenuesModule {}
