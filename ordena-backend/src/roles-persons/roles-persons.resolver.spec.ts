import { Test, TestingModule } from '@nestjs/testing';
import { RolesPersonsResolver } from './roles-persons.resolver';
import { RolesPersonsService } from './roles-persons.service';

describe('RolesPersonsResolver', () => {
  let resolver: RolesPersonsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesPersonsResolver, RolesPersonsService],
    }).compile();

    resolver = module.get<RolesPersonsResolver>(RolesPersonsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
