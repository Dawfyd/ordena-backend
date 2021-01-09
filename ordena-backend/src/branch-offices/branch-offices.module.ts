import { Module } from '@nestjs/common';
import { BranchOfficesService } from './branch-offices.service';
import { BranchOfficesResolver } from './branch-offices.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchOffice } from './entities/branch-office.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BranchOffice])
  ],
  providers: [BranchOfficesResolver, BranchOfficesService]
})
export class BranchOfficesModule {}
