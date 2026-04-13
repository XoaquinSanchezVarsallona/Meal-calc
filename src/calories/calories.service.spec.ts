import { Test, TestingModule } from '@nestjs/testing';
import { CaloriesService } from './calories.service';

describe('CaloriesService', () => {
  let service: CaloriesService;

  beforeEach(async () => {
    process.env.DATABASE_URL ??= 'postgresql://user:password@localhost:5432/meal-calc';

    const module: TestingModule = await Test.createTestingModule({
      providers: [CaloriesService],
    }).compile();

    service = module.get<CaloriesService>(CaloriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
