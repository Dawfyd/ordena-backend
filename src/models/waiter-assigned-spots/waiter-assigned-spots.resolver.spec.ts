import { Test, TestingModule } from '@nestjs/testing';
import { WaiterAssignedSpotsResolver } from './waiter-assigned-spots.resolver';
import { WaiterAssignedSpotsService } from './waiter-assigned-spots.service';

describe('WaiterAssignedSpotsResolver', () => {
  let resolver: WaiterAssignedSpotsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaiterAssignedSpotsResolver, WaiterAssignedSpotsService],
    }).compile();

    resolver = module.get<WaiterAssignedSpotsResolver>(WaiterAssignedSpotsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
