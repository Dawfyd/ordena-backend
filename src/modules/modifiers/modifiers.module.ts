import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Modifier } from './entities/modifier.entity';

import { ModifiersService } from './modifiers.service';
import { ModifiersLoaders } from './modifiers.loaders';
import { ModifiersResolver } from './modifiers.resolver';

import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Modifier]),
    ProductsModule
  ],
  providers: [ModifiersService, ModifiersLoaders, ModifiersResolver],
  exports: [ModifiersService]
})
export class ModifiersModule {}
