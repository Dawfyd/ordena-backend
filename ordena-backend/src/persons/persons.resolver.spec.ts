import { Test, TestingModule } from '@nestjs/testing';
import { PersonsResolver } from './persons.resolver';
import { PersonsService } from './persons.service';

describe('PersonsResolver', () => {
  let resolver: PersonsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonsResolver, PersonsService],
    }).compile();

    resolver = module.get<PersonsResolver>(PersonsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
