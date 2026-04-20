import { Controller, Get, Param, Query } from '@nestjs/common';
import { CaloriesService } from './calories.service';

@Controller('calories')
export class CaloriesController {
  constructor(private readonly caloriesService: CaloriesService) {}

  @Get(':userId')
  async getCaloriesForUser(
    @Param('userId') userId: string,
    @Query('activityLevel') activityLevel?: 'SEDENTARY' | 'LIGHT' | 'MODERATE' | 'INTENSE' | 'VERY_INTENSE',
  ): Promise<{ userId: string; activityLevel: string; calories: number }> {
    const calories = await this.caloriesService.calculateCalories(userId, activityLevel);

    return {
      userId,
      activityLevel: activityLevel ?? 'SEDENTARY',
      calories,
    };
  }

  @Get("/analyse/:userId")
  async analyzeWeightStatus(
    @Param('userId') userId: string,
  ): Promise<any> {
    const analysisResult = await this.caloriesService.analyzeWeightChange(userId);
    return analysisResult;
  }
}
