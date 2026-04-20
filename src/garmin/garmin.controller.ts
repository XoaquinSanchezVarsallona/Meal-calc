import { Controller } from '@nestjs/common';
import { GarminService } from './garmin.service';

@Controller('garmin')
export class GarminController {
  constructor(private readonly garminService: GarminService) {}
}
