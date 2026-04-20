import { Test, TestingModule } from '@nestjs/testing';
import { GarminService } from './garmin.service';

describe('GarminService', () => {
  let service: GarminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GarminService],
    }).compile();

    service = module.get<GarminService>(GarminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
