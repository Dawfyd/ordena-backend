import { Test, TestingModule } from '@nestjs/testing';
import { AssignedProductsResolver } from './assigned-products.resolver';
import { AssignedProductsService } from './assigned-products.service';

describe('AssignedProductsResolver', () => {
  let resolver: AssignedProductsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignedProductsResolver, AssignedProductsService],
    }).compile();

    resolver = module.get<AssignedProductsResolver>(AssignedProductsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
