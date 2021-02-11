import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './companies.resolver';

import { Company } from './entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company])
  ],
  providers: [
    CompaniesService,
    CompaniesResolver
  ],
  exports: [CompaniesService]
})
export class CompaniesModule { }
