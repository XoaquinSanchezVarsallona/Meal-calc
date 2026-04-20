import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { CaloriesService } from 'src/calories/calories.service';
import { UserManagmentService } from 'src/user_managment/user_managment.service';

@Module({
  controllers: [MealsController],
  providers: [MealsService, CaloriesService, UserManagmentService],
})
export class MealsModule {}
