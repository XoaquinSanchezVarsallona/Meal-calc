import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivitiesService {

  addActivity(activityData: any) {}
  modifyActivity(activityId: string, updateData: any) {}
  deleteActivity(activityId: string) {}
}
