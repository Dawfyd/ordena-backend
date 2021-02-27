import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ModifierTypesService } from './modifier-types.service';
import { ModifierTypesResolver } from './modifier-types.resolver';
import { ModifierType } from './entities/modifier-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModifierType])],
  providers: [ModifierTypesResolver, ModifierTypesService]
})
export class ModifierTypesModule {}
