import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { VenuesLoaders } from './venues.loaders';
import { VenuesService } from './venues.service';
import { VenuesResolver } from './venues.resolver';

import { Venue } from './entities/venue.entity';

import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venue]),
    CompaniesModule
  ],
  providers: [VenuesLoaders, VenuesService, VenuesResolver],
  exports: [VenuesService]
})
export class VenuesModule {}
