import { Controller } from '@nestjs/common';
import { CaloriesService } from './calories.service';

@Controller('calories')
export class CaloriesController {
  constructor(private readonly caloriesService: CaloriesService) {}
}
