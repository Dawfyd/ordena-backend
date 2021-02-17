import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WaiterAssignedSpot } from './entities/waiter-assigned-spot.entity';

import { WaiterAssignedSpotsService } from './waiter-assigned-spots.service';
import { WaiterAssignedSpotsLoaders } from './waiter-assigned-spots.loaders';
import { WaiterAssignedSpotsResolver } from './waiter-assigned-spots.resolver';

import { PersonsModule } from '../persons/persons.module';
import { SpotsModule } from '../spots/spots.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WaiterAssignedSpot]),
    PersonsModule,
    SpotsModule
  ],
  providers: [WaiterAssignedSpotsService, WaiterAssignedSpotsLoaders, WaiterAssignedSpotsResolver],
  exports: [WaiterAssignedSpotsService]
})
export class WaiterAssignedSpotsModule {}
