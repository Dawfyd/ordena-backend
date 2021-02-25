import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalsPerRequestsService } from './additionals-per-requests.service';
import { AdditionalsPerRequestsResolver } from './additionals-per-requests.resolver';
import { AdditionalsPerRequest } from './entities/additionals-per-request.entity';
import { ProductsModule } from '../products/products.module';
import { RequestsModule } from '../requests/requests.module';
import { AdditionalsPerRequestLoaders } from './additionals-per-requests.loaders';

@Module({
  imports: [TypeOrmModule.forFeature([AdditionalsPerRequest]),
    ProductsModule,
    RequestsModule],
  providers: [AdditionalsPerRequestLoaders, AdditionalsPerRequestsResolver, AdditionalsPerRequestsService]
})
export class AdditionalsPerRequestsModule {}
