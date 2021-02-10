import { forwardRef, Module } from '@nestjs/common';
import { CustomerAssignedSpotsService } from './customer-assigned-spots.service';
import { CustomerAssignedSpotsResolver } from './customer-assigned-spots.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAssignedSpot } from './entities/customer-assigned-spot.entity';
import { PersonsModule } from '../persons/persons.module';
import { SpotsModule } from '../spots/spots.module';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerAssignedSpot]),
  forwardRef(() => PersonsModule),
  forwardRef(() => SpotsModule)],
  providers: [CustomerAssignedSpotsResolver, CustomerAssignedSpotsService],
  exports: [CustomerAssignedSpotsService]
})
export class CustomerAssignedSpotsModule {}
