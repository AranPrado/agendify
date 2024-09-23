import { Test, TestingModule } from '@nestjs/testing';
import { ProviderServiceController } from './provider-service.controller';
import { ProviderServiceService } from './provider-service.service';

describe('ProviderServiceController', () => {
  let controller: ProviderServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderServiceController],
      providers: [ProviderServiceService],
    }).compile();

    controller = module.get<ProviderServiceController>(ProviderServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
