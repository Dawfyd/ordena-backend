import { forwardRef, Module } from '@nestjs/common';
import { AdditionalsPerRequestsService } from './additionals-per-requests.service';
import { AdditionalsPerRequestsResolver } from './additionals-per-requests.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalsPerRequest } from './entities/additionals-per-request.entity';
import { ProductsModule } from '../products/products.module';
import { RequestsModule } from '../requests/requests.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdditionalsPerRequest]),
    forwardRef(() => ProductsModule),
    forwardRef(() => RequestsModule)],
  providers: [AdditionalsPerRequestsResolver, AdditionalsPerRequestsService]
})
export class AdditionalsPerRequestsModule {}
