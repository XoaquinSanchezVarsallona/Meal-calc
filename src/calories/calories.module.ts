import { Module } from '@nestjs/common';
import { CaloriesService } from './calories.service';
import { CaloriesController } from './calories.controller';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [CaloriesController],
  providers: [CaloriesService],
})
export class CaloriesModule {}
