import { Test, TestingModule } from '@nestjs/testing';
import { BranchOfficesService } from './branch-offices.service';

describe('BranchOfficesService', () => {
  let service: BranchOfficesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchOfficesService],
    }).compile();

    service = module.get<BranchOfficesService>(BranchOfficesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
