import { Test, TestingModule } from '@nestjs/testing';
import { BranchOfficesResolver } from './branch-offices.resolver';
import { BranchOfficesService } from './branch-offices.service';

describe('BranchOfficesResolver', () => {
  let resolver: BranchOfficesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchOfficesResolver, BranchOfficesService],
    }).compile();

    resolver = module.get<BranchOfficesResolver>(BranchOfficesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
