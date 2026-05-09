import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { GarminService } from './garmin.service';
import { ActivityLoaderService } from './activityLoader.service';
import { SecurityModule } from 'src/security/security.module';

@Module({
  imports: [SecurityModule],
  controllers: [ActivitiesController],
  providers: [GarminService, ActivityLoaderService],
  exports: [GarminService, ActivityLoaderService],
})
export class ActivitiesModule {}
