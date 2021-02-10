import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAssignedSpotsResolver } from './customer-assigned-spots.resolver';
import { CustomerAssignedSpotsService } from './customer-assigned-spots.service';

describe('CustomerAssignedSpotsResolver', () => {
  let resolver: CustomerAssignedSpotsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerAssignedSpotsResolver, CustomerAssignedSpotsService],
    }).compile();

    resolver = module.get<CustomerAssignedSpotsResolver>(CustomerAssignedSpotsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
