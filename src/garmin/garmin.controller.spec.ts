import { Test, TestingModule } from '@nestjs/testing';
import { GarminController } from './garmin.controller';
import { GarminService } from './garmin.service';

describe('GarminController', () => {
  let controller: GarminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GarminController],
      providers: [GarminService],
    }).compile();

    controller = module.get<GarminController>(GarminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
