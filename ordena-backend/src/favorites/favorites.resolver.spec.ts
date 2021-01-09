import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesResolver } from './favorites.resolver';
import { FavoritesService } from './favorites.service';

describe('FavoritesResolver', () => {
  let resolver: FavoritesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoritesResolver, FavoritesService],
    }).compile();

    resolver = module.get<FavoritesResolver>(FavoritesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
