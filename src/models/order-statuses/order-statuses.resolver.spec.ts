import { Test, TestingModule } from '@nestjs/testing';
import { OrderStatusesResolver } from './order-statuses.resolver';
import { OrderStatusesService } from './order-statuses.service';

describe('OrderStatusesResolver', () => {
  let resolver: OrderStatusesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderStatusesResolver, OrderStatusesService]
    }).compile();

    resolver = module.get<OrderStatusesResolver>(OrderStatusesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
