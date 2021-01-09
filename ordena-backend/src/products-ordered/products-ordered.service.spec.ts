import { Test, TestingModule } from '@nestjs/testing';
import { ProductsOrderedService } from './products-ordered.service';

describe('ProductsOrderedService', () => {
  let service: ProductsOrderedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsOrderedService],
    }).compile();

    service = module.get<ProductsOrderedService>(ProductsOrderedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
