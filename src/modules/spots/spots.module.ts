import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Spot } from './entities/spot.entity';

import { SpotsService } from './spots.service';
import { SpotsLoaders } from './spots.loaders';
import { SpotsResolver } from './spots.resolver';

import { VenuesModule } from '../venues/venues.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Spot]),
    VenuesModule
  ],
  providers: [SpotsService, SpotsLoaders, SpotsResolver],
  exports: [SpotsService]
})
export class SpotsModule {}
