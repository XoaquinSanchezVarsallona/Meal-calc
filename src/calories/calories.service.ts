import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Goal, PrismaClient, type User, type UserCaloricStatus } from '../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { resolveDiagnosis, WeightAnalysisDiagnosisResult } from './analyze/diagnosisResolver.js';

type ActivityLevel = 'SEDENTARY' | 'LIGHT' | 'MODERATE' | 'INTENSE' | 'VERY_INTENSE';

enum WeightAlignmentDiagnosis {
  ALIGNED = 'ALIGNED',
  SLOWER_THAN_EXPECTED = 'SLOWER_THAN_EXPECTED',
  FASTER_THAN_EXPECTED = 'FASTER_THAN_EXPECTED',
  OPPOSITE_DIRECTION = 'OPPOSITE_DIRECTION',
  INSUFFICIENT_DATA = 'INSUFFICIENT_DATA',
}

abstract class WeightAnalysisResult {
  diagnosis: WeightAlignmentDiagnosis;
  observedChangeKg: number;
  expectedChangeKg: number;
  observedRatePerWeek: number;
  expectedRatePerWeek: number;
  difference: number;
  tolerance: number;
  dataPoints: number;
  static insufficient: WeightAnalysisResult;
}

WeightAnalysisResult.insufficient = {
  diagnosis: WeightAlignmentDiagnosis.INSUFFICIENT_DATA,
  observedChangeKg: 0,
  expectedChangeKg: 0,
  observedRatePerWeek: 0,
  expectedRatePerWeek: 0,
  difference: 0,
  tolerance: 0,
  dataPoints: 0,
} as WeightAnalysisResult;
 
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

  // Function that calculates minimum calories required by user.
  async calculateCalories(
    userId: string,
    activityLevel: ActivityLevel = 'SEDENTARY',
  ): Promise<number> {
    const latestRecord: UserCaloricStatus | null = await this.prisma.userCaloricStatus.findFirst({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });

    if (!latestRecord) return 0;

    const user = await this.getUser(userId);
    if (!user) return 0;

    const minimumCalories = this.mifflinCalc(user, latestRecord.weight_kg);

    const activityMultiplier: Record<ActivityLevel, number> = {
      SEDENTARY: 1.2,
      LIGHT: 1.375,
      MODERATE: 1.55,
      INTENSE: 1.725,
      VERY_INTENSE: 1.9,
    };

    const goalMultiplier: Record<Goal, number> = {
      LOSE_FAT: 0.8,
      MAINTAIN: 1,
      GAIN_MUSCLE: 1.2,
    };

    return Math.round(
      minimumCalories * activityMultiplier[activityLevel] * goalMultiplier[user.goal],
    );
  }

  // Analiza si el peso observado está alineado con el balance calórico esperado
  async analyzeWeightChange(
    userId: string,
    daysToAnalyze: number = 21,
  ): Promise<WeightAnalysisResult> {

    const endDate: Date = new Date();
    const startDate: Date = new Date();
    startDate.setDate(startDate.getDate() - daysToAnalyze);

    const user = await this.getUser(userId);

    if (!user) return WeightAnalysisResult.insufficient;

    const records: UserCaloricStatus[] = await this.prisma.userCaloricStatus.findMany({
      where: {
        user_id: userId,
        created_at: { gte: startDate, lte: endDate },
      },
      orderBy: { created_at: 'asc' },
    });

    const conditionsAreMeet: boolean = this.diagnosisConditions(
      records,
      user,
      daysToAnalyze,
    );

    if (!conditionsAreMeet) {
      return WeightAnalysisResult.insufficient;
    } else {
      const accumulatedCaloryBalance: number = records.reduce(
        (sum: number, r: UserCaloricStatus) => sum + (r.caloricIntake - r.caloricOutput),
        0,
      );

      // Conversiones
      const observedChangeKg: number = records[records.length - 1].weight_kg - records[0].weight_kg;
      // Aproximate 7700 kcal ≈ 1 kg grasa
      const expectedChangeKg: number = accumulatedCaloryBalance / 7700; 
      const daysCovered: number = records.length;
      // Aproximate Min 1 día = 0.14 weeks
      const weeksTracked: number = Math.max(daysCovered / 7, 0.14); 

      const observedRatePerWeek: number = observedChangeKg / weeksTracked;
      const expectedRatePerWeek: number = expectedChangeKg / weeksTracked;

      const { diagnosis, difference, tolerance }: WeightAnalysisDiagnosisResult = resolveDiagnosis(expectedChangeKg, observedChangeKg, user);

      return {
        diagnosis,
        observedChangeKg,
        expectedChangeKg,
        observedRatePerWeek,
        expectedRatePerWeek,
        difference,
        tolerance,
        dataPoints: records.length,
      };
    }
  }

  private diagnosisConditions(records: UserCaloricStatus[], user: User, daysToAnalyze: number): boolean {
    const insuficientRecords: boolean = records.length < 3;
    const atLeastSevenDaysOfRecords: boolean =
      records[records.length - 1].created_at.getTime() - records[0].created_at.getTime() >=
      7 * 24 * 60 * 60 * 1000;
    return !insuficientRecords || atLeastSevenDaysOfRecords;
  }

  private mifflinCalc(user: User, weightKg: number): number {
    const baseCalories = 10 * weightKg + 6.25 * user.height_cm - 5 * user.age;
    return user.gender === 'MALE' ? baseCalories + 5 : baseCalories - 161;
  }

  async onModuleDestroy(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
