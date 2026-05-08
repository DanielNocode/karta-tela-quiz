import {
  AgeBucket,
  AgeGroup,
  ArchetypeId,
  BmiGroup,
  ZoneId,
} from "./types";

export function computeBmi(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

export function bmiToGroup(bmi: number): BmiGroup {
  if (bmi < 18.5) return "A1";
  if (bmi < 25) return "A2";
  if (bmi < 30) return "A3";
  return "A4";
}

export function ageGroupToBucket(ageGroup: AgeGroup): AgeBucket {
  switch (ageGroup) {
    case "18-25":
    case "26-35":
      return "B1";
    case "36-45":
    case "46-55":
      return "B2";
    case "55+":
      return "B3";
  }
}

export interface RoutingInput {
  height: number;
  weight: number;
  ageGroup: AgeGroup;
  zone: ZoneId;
}

export function getArchetype(input: RoutingInput): ArchetypeId {
  const bmi = computeBmi(input.height, input.weight);
  let bmiGroup = bmiToGroup(bmi);
  const ageBucket = ageGroupToBucket(input.ageGroup);

  // Правило ближайшего соседа для редких комбинаций
  if (bmiGroup === "A1" && ageBucket === "B3") bmiGroup = "A2";
  if (bmiGroup === "A4" && ageBucket === "B3") bmiGroup = "A3";

  return mapToArchetype(bmiGroup, ageBucket, input.zone);
}

export function mapToArchetype(
  bmi: BmiGroup,
  age: AgeBucket,
  zone: ZoneId,
): ArchetypeId {
  // B3 (55+) — компактно
  if (age === "B3") {
    if (zone === "V7" || zone === "V8") return 36;
    return 35;
  }

  // A4 (Ожирение)
  if (bmi === "A4") {
    if (age === "B1") return zone === "V8" ? 32 : 31;
    return zone === "V8" ? 34 : 33; // B2
  }

  // A1 (Худая)
  if (bmi === "A1") {
    if (age === "B2") return 6;
    // B1
    if (zone === "V1" || zone === "V8") return 1;
    if (zone === "V2") return 2;
    if (zone === "V3" || zone === "V4") return 3;
    if (zone === "V5" || zone === "V6") return 4;
    if (zone === "V7") return 5;
  }

  // A2 + B1
  if (bmi === "A2" && age === "B1") {
    const map: Record<ZoneId, ArchetypeId> = {
      V1: 7,
      V2: 8,
      V3: 9,
      V4: 10,
      V5: 11,
      V6: 12,
      V7: 13,
      V8: 14,
    };
    return map[zone];
  }

  // A2 + B2
  if (bmi === "A2" && age === "B2") {
    if (zone === "V1" || zone === "V2") return 15;
    if (zone === "V3" || zone === "V4") return 16;
    if (zone === "V5" || zone === "V6") return 17;
    if (zone === "V7") return 18;
    if (zone === "V8") return 19;
  }

  // A3 + B1
  if (bmi === "A3" && age === "B1") {
    if (zone === "V1") return 20;
    if (zone === "V2") return 21;
    if (zone === "V3" || zone === "V4") return 22;
    if (zone === "V5" || zone === "V6") return 23;
    if (zone === "V7") return 24;
    if (zone === "V8") return 25;
  }

  // A3 + B2
  if (bmi === "A3" && age === "B2") {
    if (zone === "V1" || zone === "V2") return 26;
    if (zone === "V3" || zone === "V4") return 27;
    if (zone === "V5" || zone === "V6") return 28;
    if (zone === "V7") return 29;
    if (zone === "V8") return 30;
  }

  return 14;
}
