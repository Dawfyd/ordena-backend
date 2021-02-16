import { Test, TestingModule } from '@nestjs/testing';
import { ProductsInVenueService } from './products-in-venue.service';

describe('ProductsInVenueService', () => {
  let service: ProductsInVenueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsInVenueService],
    }).compile();

    service = module.get<ProductsInVenueService>(ProductsInVenueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
