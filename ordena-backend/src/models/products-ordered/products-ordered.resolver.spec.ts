import { Test, TestingModule } from '@nestjs/testing';
import { ProductsOrderedResolver } from './products-ordered.resolver';
import { ProductsOrderedService } from './products-ordered.service';

describe('ProductsOrderedResolver', () => {
  let resolver: ProductsOrderedResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsOrderedResolver, ProductsOrderedService],
    }).compile();

    resolver = module.get<ProductsOrderedResolver>(ProductsOrderedResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
