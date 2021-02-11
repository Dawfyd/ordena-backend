import { Test, TestingModule } from '@nestjs/testing';
import { AssignedCategoriesService } from './assigned-categories.service';

describe('AssignedCategoriesService', () => {
  let service: AssignedCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignedCategoriesService]
    }).compile();

    service = module.get<AssignedCategoriesService>(AssignedCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
