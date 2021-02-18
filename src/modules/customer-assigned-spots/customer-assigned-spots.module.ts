import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerAssignedSpot } from './entities/customer-assigned-spot.entity';

import { CustomerAssignedSpotsService } from './customer-assigned-spots.service';
import { CustomerAssignedSpotsLoaders } from './customer-assigned-spots.loaders';
import { CustomerAssignedSpotsResolver } from './customer-assigned-spots.resolver';

import { PersonsModule } from '../persons/persons.module';
import { SpotsModule } from '../spots/spots.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerAssignedSpot]),
    PersonsModule,
    SpotsModule
  ],
  providers: [CustomerAssignedSpotsService, CustomerAssignedSpotsLoaders, CustomerAssignedSpotsResolver],
  exports: [CustomerAssignedSpotsService]
})
export class CustomerAssignedSpotsModule {}
