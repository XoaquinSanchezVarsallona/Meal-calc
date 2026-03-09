import { Test, TestingModule } from '@nestjs/testing';
import { CaloriesController } from './calories.controller';
import { CaloriesService } from './calories.service';

describe('CaloriesController', () => {
  let controller: CaloriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaloriesController],
      providers: [CaloriesService],
    }).compile();

    controller = module.get<CaloriesController>(CaloriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
