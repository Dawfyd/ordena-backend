import { Test, TestingModule } from '@nestjs/testing';
import { ProductTypesResolver } from './product-types.resolver';
import { ProductTypesService } from './product-types.service';

describe('ProductTypesResolver', () => {
  let resolver: ProductTypesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductTypesResolver, ProductTypesService],
    }).compile();

    resolver = module.get<ProductTypesResolver>(ProductTypesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
