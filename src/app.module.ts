import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';
import { CaloriesModule } from './calories/calories.module';
import { MealsModule } from './meals/meals.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AiModule, CaloriesModule, MealsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
