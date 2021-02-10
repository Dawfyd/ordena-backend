import { Test, TestingModule } from '@nestjs/testing';
import { ModifiersPerRequestService } from './modifiers-per-request.service';

describe('ModifiersPerRequestService', () => {
  let service: ModifiersPerRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModifiersPerRequestService]
    }).compile();

    service = module.get<ModifiersPerRequestService>(ModifiersPerRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
