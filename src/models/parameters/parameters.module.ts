import { Module } from '@nestjs/common';
import { ParametersService } from './parameters.service';
import { ParametersResolver } from './parameters.resolver';
import { Parameter } from './entities/parameter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Parameter])],
  providers: [ParametersResolver, ParametersService],
  exports: [ParametersService]
})
export class ParametersModule {}
