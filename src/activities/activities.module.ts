import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { StravaService } from './strava.service';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService, StravaService],
})
export class ActivitiesModule {}
