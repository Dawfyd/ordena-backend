import { Test, TestingModule } from '@nestjs/testing';
import { ModifierTypesResolver } from './modifier-types.resolver';
import { ModifierTypesService } from './modifier-types.service';

describe('ModifierTypesResolver', () => {
  let resolver: ModifierTypesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModifierTypesResolver, ModifierTypesService],
    }).compile();

    resolver = module.get<ModifierTypesResolver>(ModifierTypesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
