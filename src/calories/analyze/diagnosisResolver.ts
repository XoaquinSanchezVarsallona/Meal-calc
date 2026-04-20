import { Goal, type User } from '../../../generated/prisma/client.js';

export enum WeightAlignmentDiagnosis {
  ALIGNED = 'ALIGNED',
  SLOWER_THAN_EXPECTED = 'SLOWER_THAN_EXPECTED',
  FASTER_THAN_EXPECTED = 'FASTER_THAN_EXPECTED',
  OPPOSITE_DIRECTION = 'OPPOSITE_DIRECTION',
  INSUFFICIENT_DATA = 'INSUFFICIENT_DATA',
}

export type WeightAnalysisDiagnosisResult= {
  diagnosis: WeightAlignmentDiagnosis;
  difference: number;
  tolerance: number;
}

export function resolveDiagnosis(
  expected: number,
  observed: number,
  user: User,
): WeightAnalysisDiagnosisResult {
  const tolerance: number = (() => {
    switch (user.goal) {
      case Goal.MAINTAIN:
        return 0.75;
      case Goal.GAIN_MUSCLE:
        return 0.5;
      case Goal.LOSE_FAT:
        return 0.5;
      default:
        return 0.5;
    }
  })();

  const signExpected: number = Math.sign(expected);
  const signObserved: number = Math.sign(observed);
  const difference: number = observed - expected;



  if (userGoingInOppositeDirection(signExpected, signObserved)) {
    return { diagnosis: WeightAlignmentDiagnosis.OPPOSITE_DIRECTION, difference, tolerance};
  }

  if (Math.abs(difference) <= tolerance) {
    return { diagnosis: WeightAlignmentDiagnosis.ALIGNED, difference, tolerance};
  }

  if (Math.abs(observed) < Math.abs(expected)) {
    return { diagnosis: WeightAlignmentDiagnosis.SLOWER_THAN_EXPECTED, difference, tolerance};
  }

  return { diagnosis: WeightAlignmentDiagnosis.FASTER_THAN_EXPECTED, difference, tolerance};
}

function userGoingInOppositeDirection(signExpected: number, signObserved: number): boolean {
  return signExpected !== 0 && signObserved !== 0 && signExpected !== signObserved;
}
