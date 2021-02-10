import { Test, TestingModule } from '@nestjs/testing';
import { RequestStatusesService } from './request-statuses.service';

describe('RequestStatusesService', () => {
  let service: RequestStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestStatusesService],
    }).compile();

    service = module.get<RequestStatusesService>(RequestStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
