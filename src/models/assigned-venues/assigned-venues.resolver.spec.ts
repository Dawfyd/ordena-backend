import { Test, TestingModule } from '@nestjs/testing';
import { AssignedVenuesResolver } from './assigned-venues.resolver';
import { AssignedVenuesService } from './assigned-venues.service';

describe('AssignedVenuesResolver', () => {
  let resolver: AssignedVenuesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignedVenuesResolver, AssignedVenuesService],
    }).compile();

    resolver = module.get<AssignedVenuesResolver>(AssignedVenuesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
