import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Modifier } from './entities/modifier.entity';
import { ProductsModule } from '../products/products.module';
import { ModifierTypesModule } from '../modifier-types/modifier-types.module';
import { ParametersModule } from '../parameters/parameters.module';

import { ModifiersService } from './modifiers.service';
import { ModifiersLoaders } from './modifiers.loaders';
import { ModifiersResolver } from './modifiers.resolver';
import { ProductTypesModule } from '../product-types/product-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Modifier]),
    ProductsModule,
    ModifierTypesModule,
    ParametersModule,
    ProductTypesModule
  ],
  providers: [ModifiersService, ModifiersLoaders, ModifiersResolver],
  exports: [ModifiersService]
})
export class ModifiersModule {}
