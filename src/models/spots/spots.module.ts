import { Module } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { SpotsResolver } from './spots.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spot } from './entities/spot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spot])],
  providers: [SpotsResolver, SpotsService],
})
export class SpotsModule {}
