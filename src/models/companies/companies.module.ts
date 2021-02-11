import { Module, forwardRef } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './companies.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { VenuesModule } from '../venues/venues.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company]),
    forwardRef(() => VenuesModule)],
  providers: [CompaniesResolver, CompaniesService],
  exports: [CompaniesService]
})
export class CompaniesModule {}
