import { Module } from '@nestjs/common';
import { AiModule } from './ai/ai.module';
import { MealsModule } from './meals/meals.module';
import { CaloriesModule } from './calories/calories.module';
import { MealsModule } from './meals/meals.module';
import { AiModule } from './ai/ai.module';
import { CaloriesModule } from './calories/calories.module';
@Module({
  imports: [AiModule, MealsModule, CaloriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}