import { Test, TestingModule } from '@nestjs/testing';
import { ParametersResolver } from './parameters.resolver';
import { ParametersService } from './parameters.service';

describe('ParametersResolver', () => {
  let resolver: ParametersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParametersResolver, ParametersService]
    }).compile();

    resolver = module.get<ParametersResolver>(ParametersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
