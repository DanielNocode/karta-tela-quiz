import { computeBmi } from "./routing";

export function formatBmi(heightCm: number, weightKg: number): string {
  const bmi = computeBmi(heightCm, weightKg);
  return bmi.toFixed(1).replace(".", ",");
}

export { computeBmi };
