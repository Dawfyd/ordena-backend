import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalsPerRequestsService } from './additionals-per-requests.service';

describe('AdditionalsPerRequestsService', () => {
  let service: AdditionalsPerRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdditionalsPerRequestsService]
    }).compile();

    service = module.get<AdditionalsPerRequestsService>(AdditionalsPerRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
