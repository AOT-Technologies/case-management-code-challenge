import { Test, TestingModule } from '@nestjs/testing';

import { CaseflowLobService } from '../services/caseflow_lob.service';
import { CaseflowLobResolver } from './caseflow_lob.resolver';

describe('CaseflowLobResolver', () => {
  let resolver: CaseflowLobResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaseflowLobResolver, CaseflowLobService],
    }).compile();

    resolver = module.get<CaseflowLobResolver>(CaseflowLobResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
