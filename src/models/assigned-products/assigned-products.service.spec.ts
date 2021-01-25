import { Test, TestingModule } from '@nestjs/testing';
import { AssignedProductsService } from './assigned-products.service';

describe('AssignedProductsService', () => {
  let service: AssignedProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignedProductsService],
    }).compile();

    service = module.get<AssignedProductsService>(AssignedProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
