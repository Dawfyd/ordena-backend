import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ModifiersPerRequest } from './entities/modifiers-per-request.entity';

import { ModifiersPerRequestService } from './modifiers-per-request.service';
import { ModifiersPerRequestLoaders } from './modifiers-per-request.loaders';
import { ModifiersPerRequestResolver } from './modifiers-per-request.resolver';

import { RequestsModule } from '../requests/requests.module';
import { ModifiersModule } from '../modifiers/modifiers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ModifiersPerRequest]),
    RequestsModule,
    ModifiersModule
  ],
  providers: [ModifiersPerRequestService, ModifiersPerRequestLoaders, ModifiersPerRequestResolver],
  exports: [ModifiersPerRequestService]
})
export class ModifiersPerRequestModule {}
