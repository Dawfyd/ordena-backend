import { Test, TestingModule } from '@nestjs/testing';
import { ModifiersPerRequestResolver } from './modifiers-per-request.resolver';
import { ModifiersPerRequestService } from './modifiers-per-request.service';

describe('ModifiersPerRequestResolver', () => {
  let resolver: ModifiersPerRequestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModifiersPerRequestResolver, ModifiersPerRequestService]
    }).compile();

    resolver = module.get<ModifiersPerRequestResolver>(ModifiersPerRequestResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
