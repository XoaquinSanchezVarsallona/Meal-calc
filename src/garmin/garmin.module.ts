import { Module } from '@nestjs/common';
import { GarminService } from './garmin.service';
import { GarminController } from './garmin.controller';

@Module({
  controllers: [GarminController],
  providers: [GarminService],
})
export class GarminModule {}
