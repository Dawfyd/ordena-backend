import { Module } from '@nestjs/common';
import { ModifiersService } from './modifiers.service';
import { ModifiersResolver } from './modifiers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modifier } from './entities/modifier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Modifier])],
  providers: [ModifiersResolver, ModifiersService],
})
export class ModifiersModule {}
