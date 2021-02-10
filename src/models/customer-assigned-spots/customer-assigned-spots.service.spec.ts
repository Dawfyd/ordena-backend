import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAssignedSpotsService } from './customer-assigned-spots.service';

describe('CustomerAssignedSpotsService', () => {
  let service: CustomerAssignedSpotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerAssignedSpotsService]
    }).compile();

    service = module.get<CustomerAssignedSpotsService>(CustomerAssignedSpotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
