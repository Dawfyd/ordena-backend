import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';

import { VenuesResolver } from './venues.resolver';
import { VenuesService } from './venues.service';
import { Venue } from './entities/venue.entity';

import { CompaniesModule } from '../companies/companies.module';
import { MenusModule } from '../menus/menus.module';
import { SpotsModule } from '../spots/spots.module';
import { AssignedVenuesModule } from '../assigned-venues/assigned-venues.module';

@Module({
  imports: [TypeOrmModule.forFeature([Venue]),
    forwardRef(() => CompaniesModule),
    forwardRef(() => MenusModule),
    forwardRef(() => SpotsModule),
    forwardRef(() => AssignedVenuesModule)
  ],
  providers: [VenuesResolver, VenuesService],
  exports: [VenuesService]
})
export class VenuesModule {}
