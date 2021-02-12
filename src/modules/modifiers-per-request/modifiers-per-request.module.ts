import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModifiersPerRequestService } from './modifiers-per-request.service';
import { ModifiersPerRequestResolver } from './modifiers-per-request.resolver';
import { ModifiersPerRequest } from './entities/modifiers-per-request.entity';
import { RequestsModule } from '../requests/requests.module';
import { ModifiersModule } from '../modifiers/modifiers.module';

@Module({
  imports: [TypeOrmModule.forFeature([ModifiersPerRequest]),
    forwardRef(() => RequestsModule),
    forwardRef(() => ModifiersModule)],
  providers: [ModifiersPerRequestResolver, ModifiersPerRequestService],
  exports: [ModifiersPerRequestService]
})
export class ModifiersPerRequestModule {}
