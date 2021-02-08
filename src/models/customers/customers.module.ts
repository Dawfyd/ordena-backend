import { Module, forwardRef } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersResolver } from './customers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { VenuesModule } from '../venues/venues.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]),
    forwardRef(() => VenuesModule)],
  providers: [CustomersResolver, CustomersService],
  exports: [CustomersService]
})
export class CustomersModule {}
