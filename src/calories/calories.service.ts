import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Goal, PrismaClient, type User } from '../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

type ActivityLevel = 'SEDENTARY' | 'LIGHT' | 'MODERATE' | 'INTENSE' | 'VERY_INTENSE';

@Injectable()
export class CaloriesService implements OnModuleDestroy {
  private readonly prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL ?? 'postgresql://user:password@localhost:5432/meal-calc',
    }),
  });

  async getUser(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  // Function that calculates minimum calories requiered by user.
  calculateCalories(user: User, activityLevel: ActivityLevel = 'SEDENTARY'): number {
    const minimumCalories = this.mifflinCalc(user);

    const activityMultiplier: Record<ActivityLevel, number> = {
      SEDENTARY: 1.2,
      LIGHT: 1.375,
      MODERATE: 1.55,
      INTENSE: 1.725,
      VERY_INTENSE: 1.9,
    };

    const goal : Record<Goal, number> = {
      LOSE_FAT: 0.8,
      MAINTAIN: 1,
      GAIN_MUSCLE: 1.2,
    };

    return Math.round(minimumCalories * activityMultiplier[activityLevel]);
  }

  // This function analyze previous weight changes with minimum calories provided and adjusts the calories requiered.
  analyzeWeightChange(user: User, predictedMinimumCalories: number): number {
    
  }

  private

  private mifflinCalc (user: User) : number {
    const baseCalories = 10 * user.weight_kg + 6.25 * user.height_cm - 5 * user.age;
    return user.gender === 'MALE' ? baseCalories + 5 : baseCalories - 161;
  }

  async onModuleDestroy(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
