import { Test, TestingModule } from '@nestjs/testing';
import { PricesResolver } from './prices.resolver';
import { PricesService } from './prices.service';

describe('PricesResolver', () => {
  let resolver: PricesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PricesResolver, PricesService],
    }).compile();

    resolver = module.get<PricesResolver>(PricesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
