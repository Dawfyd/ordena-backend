import { Test, TestingModule } from '@nestjs/testing';
import { ModifierTypesService } from './modifier-types.service';

describe('ModifierTypesService', () => {
  let service: ModifierTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModifierTypesService]
    }).compile();

    service = module.get<ModifierTypesService>(ModifierTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
