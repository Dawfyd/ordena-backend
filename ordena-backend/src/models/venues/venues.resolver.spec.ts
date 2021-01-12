import { Test, TestingModule } from '@nestjs/testing';
import { VenuesResolver } from './venues.resolver';
import { VenuesService } from './venues.service';

describe('VenuesResolver', () => {
  let resolver: VenuesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VenuesResolver, VenuesService],
    }).compile();

    resolver = module.get<VenuesResolver>(VenuesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
