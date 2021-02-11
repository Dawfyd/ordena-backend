import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParametersService } from './parameters.service';
import { ParametersResolver } from './parameters.resolver';
import { Parameter } from './entities/parameter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parameter])],
  providers: [ParametersResolver, ParametersService],
  exports: [ParametersService]
})
export class ParametersModule {}
