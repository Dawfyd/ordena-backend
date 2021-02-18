import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RequestStatusesService } from './request-statuses.service';
import { RequestStatusesResolver } from './request-statuses.resolver';
import { RequestStatus } from './entities/request-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestStatus])],
  providers: [RequestStatusesResolver, RequestStatusesService],
  exports: [RequestStatusesService]
})
export class RequestStatusesModule {}
