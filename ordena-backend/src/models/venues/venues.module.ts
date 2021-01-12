import { Module } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { VenuesResolver } from './venues.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from './entities/venue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venue])],
  providers: [VenuesResolver, VenuesService],
})
export class VenuesModule {}
