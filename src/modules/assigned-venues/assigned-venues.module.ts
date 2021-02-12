import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignedVenuesService } from './assigned-venues.service';
import { AssignedVenuesResolver } from './assigned-venues.resolver';
import { AssignedVenue } from './entities/assigned-venue.entity';
import { PersonsModule } from '../persons/persons.module';
import { VenuesModule } from '../venues/venues.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssignedVenue]),
    forwardRef(() => PersonsModule),
    forwardRef(() => VenuesModule)],
  providers: [AssignedVenuesResolver, AssignedVenuesService],
  exports: [AssignedVenuesService]
})
export class AssignedVenuesModule {}
