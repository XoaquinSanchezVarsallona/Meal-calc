import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { CaloriesService } from 'src/calories/calories.service';

@Module({
  controllers: [MealsController],
  providers: [MealsService, CaloriesService],
})
export class MealsModule {}
