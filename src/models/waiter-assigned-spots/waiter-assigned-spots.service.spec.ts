import { Test, TestingModule } from '@nestjs/testing';
import { WaiterAssignedSpotsService } from './waiter-assigned-spots.service';

describe('WaiterAssignedSpotsService', () => {
  let service: WaiterAssignedSpotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaiterAssignedSpotsService]
    }).compile();

    service = module.get<WaiterAssignedSpotsService>(WaiterAssignedSpotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
