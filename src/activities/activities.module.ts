import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { GarminService } from './garmin.service';

@Module({
  controllers: [ActivitiesController],
  providers: [GarminService],
  exports: [GarminService],
})
export class ActivitiesModule {}
