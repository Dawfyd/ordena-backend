import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaiterAssignedSpotsService } from './waiter-assigned-spots.service';
import { WaiterAssignedSpotsResolver } from './waiter-assigned-spots.resolver';
import { WaiterAssignedSpot } from './entities/waiter-assigned-spot.entity';
import { PersonsModule } from '../persons/persons.module';
import { SpotsModule } from '../spots/spots.module';

@Module({
  imports: [TypeOrmModule.forFeature([WaiterAssignedSpot]),
    forwardRef(() => PersonsModule),
    forwardRef(() => SpotsModule)],
  providers: [WaiterAssignedSpotsResolver, WaiterAssignedSpotsService],
  exports: [WaiterAssignedSpotsService]
})
export class WaiterAssignedSpotsModule {}
