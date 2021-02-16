import { Test, TestingModule } from '@nestjs/testing';
import { ProductsInVenueResolver } from './products-in-venue.resolver';
import { ProductsInVenueService } from './products-in-venue.service';

describe('ProductsInVenueResolver', () => {
  let resolver: ProductsInVenueResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsInVenueResolver, ProductsInVenueService],
    }).compile();

    resolver = module.get<ProductsInVenueResolver>(ProductsInVenueResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
