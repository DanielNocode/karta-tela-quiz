export type ZoneId =
  | "V1"
  | "V2"
  | "V3"
  | "V4"
  | "V5"
  | "V6"
  | "V7"
  | "V8";

export type ArchetypeId =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30
  | 31 | 32 | 33 | 34 | 35 | 36;

export type Gender = "female" | "male";

export type AgeGroup = "18-25" | "26-35" | "36-45" | "46-55" | "55+";

export type BmiGroup = "A1" | "A2" | "A3" | "A4";
export type AgeBucket = "B1" | "B2" | "B3";

export interface QuizState {
  currentStep: number;
  height: number | null;
  weight: number | null;
  ageGroup: AgeGroup | null;
  gender: Gender | null;
  zone: ZoneId | null;
  followup1: string | null;
  followup2: string | null;
  outcomes: string[];
  archetype: ArchetypeId | null;
}

export interface ArchetypeContent {
  id: ArchetypeId;
  title: string;
  summary: string;
  analysis: string;
  notHelpful: string;
  recommendations: string;
  webinarPitch: string;
}

export const ZONE_LABELS: Record<ZoneId, string> = {
  V1: "живот снизу",
  V2: "живот сверху",
  V3: "ушки на бёдрах",
  V4: "бока",
  V5: "второй подбородок",
  V6: "шея и плечи",
  V7: "отёки и целлюлит",
  V8: "везде понемногу",
};

export const ZONE_OPTIONS: Array<{ id: ZoneId; label: string }> = [
  { id: "V1", label: "Живот снизу (под пупком)" },
  { id: "V2", label: "Живот сверху (под рёбрами, «валик»)" },
  { id: "V3", label: "Ушки на бёдрах (галифе)" },
  { id: "V4", label: "Бока («спасательный круг»)" },
  { id: "V5", label: "Второй подбородок" },
  { id: "V6", label: "Шея, плечи (холка)" },
  { id: "V7", label: "Отёки и целлюлит" },
  { id: "V8", label: "Везде понемногу" },
];

export const AGE_OPTIONS: AgeGroup[] = [
  "18-25",
  "26-35",
  "36-45",
  "46-55",
  "55+",
];

export const INITIAL_QUIZ_STATE: QuizState = {
  currentStep: 0,
  height: null,
  weight: null,
  ageGroup: null,
  gender: null,
  zone: null,
  followup1: null,
  followup2: null,
  outcomes: [],
  archetype: null,
};
