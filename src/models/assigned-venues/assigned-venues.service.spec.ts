import { Test, TestingModule } from '@nestjs/testing';
import { AssignedVenuesService } from './assigned-venues.service';

describe('AssignedVenuesService', () => {
  let service: AssignedVenuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignedVenuesService]
    }).compile();

    service = module.get<AssignedVenuesService>(AssignedVenuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
