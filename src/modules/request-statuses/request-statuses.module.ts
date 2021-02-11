import { forwardRef, Module } from '@nestjs/common';
import { RequestStatusesService } from './request-statuses.service';
import { RequestStatusesResolver } from './request-statuses.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestStatus } from './entities/request-status.entity';
import { RequestsModule } from '../requests/requests.module';

@Module({
  imports: [TypeOrmModule.forFeature([RequestStatus]),
    forwardRef(() => RequestsModule)],
  providers: [RequestStatusesResolver, RequestStatusesService],
  exports: [RequestStatusesService]
})
export class RequestStatusesModule {}
