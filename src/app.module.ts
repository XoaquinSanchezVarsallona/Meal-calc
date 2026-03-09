import { Module } from '@nestjs/common';
import { AiModule } from './ai/ai.module';
import { MealsModule } from './meals/meals.module';
@Module({
  imports: [AiModule, MealsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}