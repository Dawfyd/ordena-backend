import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssignedVenue } from './entities/assigned-venue.entity';

import { AssignedVenuesService } from './assigned-venues.service';
import { AssignedVenuesLoaders } from './assigned-venues.loaders';
import { AssignedVenuesResolver } from './assigned-venues.resolver';

import { PersonsModule } from '../persons/persons.module';
import { VenuesModule } from '../venues/venues.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssignedVenue]),
    PersonsModule,
    VenuesModule
  ],
  providers: [AssignedVenuesService, AssignedVenuesLoaders, AssignedVenuesResolver],
  exports: [AssignedVenuesService]
})
export class AssignedVenuesModule {}
