import { Module, forwardRef } from '@nestjs/common';
import { ModifiersService } from './modifiers.service';
import { ModifiersResolver } from './modifiers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modifier } from './entities/modifier.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Modifier]),
    forwardRef(() => ProductsModule)],
  providers: [ModifiersResolver, ModifiersService],
  exports: [ModifiersService]
})
export class ModifiersModule {}
