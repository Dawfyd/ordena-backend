import { Test, TestingModule } from '@nestjs/testing';
import { ModifiersResolver } from './modifiers.resolver';
import { ModifiersService } from './modifiers.service';

describe('ModifiersResolver', () => {
  let resolver: ModifiersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModifiersResolver, ModifiersService]
    }).compile();

    resolver = module.get<ModifiersResolver>(ModifiersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
