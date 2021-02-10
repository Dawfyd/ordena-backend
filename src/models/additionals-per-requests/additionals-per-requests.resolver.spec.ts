import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalsPerRequestsResolver } from './additionals-per-requests.resolver';
import { AdditionalsPerRequestsService } from './additionals-per-requests.service';

describe('AdditionalsPerRequestsResolver', () => {
  let resolver: AdditionalsPerRequestsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdditionalsPerRequestsResolver, AdditionalsPerRequestsService],
    }).compile();

    resolver = module.get<AdditionalsPerRequestsResolver>(AdditionalsPerRequestsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
