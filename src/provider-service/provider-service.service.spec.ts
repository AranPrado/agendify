import { Test, TestingModule } from '@nestjs/testing';
import { ProviderServiceService } from './provider-service.service';

describe('ProviderServiceService', () => {
  let service: ProviderServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProviderServiceService],
    }).compile();

    service = module.get<ProviderServiceService>(ProviderServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
