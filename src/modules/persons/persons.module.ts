import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicAclModule } from 'src/common/integrations/basic-acl/basic-acl.module';
import { PersonsService } from './persons.service';
import { PersonsResolver } from './persons.resolver';
import { Person } from './entities/person.entity';
import { ParametersModule } from '../parameters/parameters.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    BasicAclModule,
    ParametersModule
  ],
  providers: [PersonsResolver, PersonsService],
  exports: [PersonsService]
})
export class PersonsModule {}
