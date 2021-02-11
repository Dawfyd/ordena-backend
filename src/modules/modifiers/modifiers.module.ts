import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModifiersService } from './modifiers.service';
import { ModifiersResolver } from './modifiers.resolver';
import { Modifier } from './entities/modifier.entity';
import { ProductsModule } from '../products/products.module';
import { ModifiersPerRequestModule } from '../modifiers-per-request/modifiers-per-request.module';

@Module({
  imports: [TypeOrmModule.forFeature([Modifier]),
    forwardRef(() => ModifiersPerRequestModule),
    forwardRef(() => ProductsModule)],
  providers: [ModifiersResolver, ModifiersService],
  exports: [ModifiersService]
})
export class ModifiersModule {}
