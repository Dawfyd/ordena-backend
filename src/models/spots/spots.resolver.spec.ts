import { Test, TestingModule } from '@nestjs/testing';
import { SpotsResolver } from './spots.resolver';
import { SpotsService } from './spots.service';

describe('SpotsResolver', () => {
  let resolver: SpotsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotsResolver, SpotsService],
    }).compile();

    resolver = module.get<SpotsResolver>(SpotsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
