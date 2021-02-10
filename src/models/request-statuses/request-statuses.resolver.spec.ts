import { Test, TestingModule } from '@nestjs/testing';
import { RequestStatusesResolver } from './request-statuses.resolver';
import { RequestStatusesService } from './request-statuses.service';

describe('RequestStatusesResolver', () => {
  let resolver: RequestStatusesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestStatusesResolver, RequestStatusesService],
    }).compile();

    resolver = module.get<RequestStatusesResolver>(RequestStatusesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
