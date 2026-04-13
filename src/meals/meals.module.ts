import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { AiService } from 'src/ai/ai.service';

@Module({
  controllers: [],
  providers: [MealsService, AiService],
})
export class MealsModule {}
