import { Test, TestingModule } from '@nestjs/testing';
import { AssignedCategoriesResolver } from './assigned-categories.resolver';
import { AssignedCategoriesService } from './assigned-categories.service';

describe('AssignedCategoriesResolver', () => {
  let resolver: AssignedCategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignedCategoriesResolver, AssignedCategoriesService],
    }).compile();

    resolver = module.get<AssignedCategoriesResolver>(AssignedCategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
