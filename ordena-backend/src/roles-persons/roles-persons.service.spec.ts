import { Test, TestingModule } from '@nestjs/testing';
import { RolesPersonsService } from './roles-persons.service';

describe('RolesPersonsService', () => {
  let service: RolesPersonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesPersonsService],
    }).compile();

    service = module.get<RolesPersonsService>(RolesPersonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
