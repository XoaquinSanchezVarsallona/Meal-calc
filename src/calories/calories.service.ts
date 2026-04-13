import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, type User } from '../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

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

  requiredCalories(user: User): number {
    const baseCalories = 10 * user.weight_kg + 6.25 * user.height_cm - 5 * user.age;

    if (user.gender === 'MALE') {
      return Math.round(baseCalories + 5);
    }

    return Math.round(baseCalories - 161);
  }

  async onModuleDestroy(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
