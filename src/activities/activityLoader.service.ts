import { Logger, Injectable, OnModuleDestroy } from '@nestjs/common';
import { type Activity, PrismaClient, type Prisma } from '@prisma/client';

@Injectable()
export class ActivityLoaderService implements OnModuleDestroy {
  logger = new Logger(ActivityLoaderService.name);
  prisma = new PrismaClient();

  onModuleDestroy() {
    this.logger.warn(
      'ActivityLoaderService is being destroyed. Cleaning up resources if necessary.',
    );
  }

  async getAllActivities(): Promise<Activity[]> {
    return this.prisma.activity.findMany();
  }

  async getActivityById(id: string): Promise<Activity | null> {
    return this.prisma.activity.findUnique({
      where: { id },
    });
  }

  async saveActivity(
    activityData: Prisma.ActivityUncheckedCreateInput,
  ): Promise<Activity> {
    return this.prisma.activity.create({
      data: activityData,
    });
  }
}
