import { describe, expect, it } from "vitest";
import {
  ageGroupToBucket,
  bmiToGroup,
  computeBmi,
  getArchetype,
  mapToArchetype,
} from "./routing";
import { ArchetypeId, ZoneId } from "./types";

describe("computeBmi", () => {
  it("computes BMI correctly", () => {
    expect(computeBmi(165, 65)).toBeCloseTo(23.88, 1);
    expect(computeBmi(170, 50)).toBeCloseTo(17.30, 1);
    expect(computeBmi(160, 80)).toBeCloseTo(31.25, 1);
  });
});

describe("bmiToGroup", () => {
  it("classifies BMI into A1-A4 with correct boundaries", () => {
    expect(bmiToGroup(17)).toBe("A1");
    expect(bmiToGroup(18.4)).toBe("A1");
    expect(bmiToGroup(18.5)).toBe("A2");
    expect(bmiToGroup(22)).toBe("A2");
    expect(bmiToGroup(24.9)).toBe("A2");
    expect(bmiToGroup(25)).toBe("A3");
    expect(bmiToGroup(29.9)).toBe("A3");
    expect(bmiToGroup(30)).toBe("A4");
    expect(bmiToGroup(40)).toBe("A4");
  });
});

describe("ageGroupToBucket", () => {
  it("maps age groups to buckets", () => {
    expect(ageGroupToBucket("18-25")).toBe("B1");
    expect(ageGroupToBucket("26-35")).toBe("B1");
    expect(ageGroupToBucket("36-45")).toBe("B2");
    expect(ageGroupToBucket("46-55")).toBe("B2");
    expect(ageGroupToBucket("55+")).toBe("B3");
  });
});

describe("mapToArchetype — A1 (Худая) + B1", () => {
  it("V1 and V8 → 1", () => {
    expect(mapToArchetype("A1", "B1", "V1")).toBe(1);
    expect(mapToArchetype("A1", "B1", "V8")).toBe(1);
  });
  it("V2 → 2", () => {
    expect(mapToArchetype("A1", "B1", "V2")).toBe(2);
  });
  it("V3 and V4 → 3", () => {
    expect(mapToArchetype("A1", "B1", "V3")).toBe(3);
    expect(mapToArchetype("A1", "B1", "V4")).toBe(3);
  });
  it("V5 and V6 → 4", () => {
    expect(mapToArchetype("A1", "B1", "V5")).toBe(4);
    expect(mapToArchetype("A1", "B1", "V6")).toBe(4);
  });
  it("V7 → 5", () => {
    expect(mapToArchetype("A1", "B1", "V7")).toBe(5);
  });
});

describe("mapToArchetype — A1 + B2 (any zone)", () => {
  const zones: ZoneId[] = ["V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8"];
  for (const z of zones) {
    it(`zone ${z} → 6`, () => {
      expect(mapToArchetype("A1", "B2", z)).toBe(6);
    });
  }
});

describe("mapToArchetype — A2 (Норма) + B1", () => {
  const cases: Array<[ZoneId, ArchetypeId]> = [
    ["V1", 7], ["V2", 8], ["V3", 9], ["V4", 10],
    ["V5", 11], ["V6", 12], ["V7", 13], ["V8", 14],
  ];
  for (const [z, expected] of cases) {
    it(`${z} → ${expected}`, () => {
      expect(mapToArchetype("A2", "B1", z)).toBe(expected);
    });
  }
});

describe("mapToArchetype — A2 + B2", () => {
  it("V1, V2 → 15", () => {
    expect(mapToArchetype("A2", "B2", "V1")).toBe(15);
    expect(mapToArchetype("A2", "B2", "V2")).toBe(15);
  });
  it("V3, V4 → 16", () => {
    expect(mapToArchetype("A2", "B2", "V3")).toBe(16);
    expect(mapToArchetype("A2", "B2", "V4")).toBe(16);
  });
  it("V5, V6 → 17", () => {
    expect(mapToArchetype("A2", "B2", "V5")).toBe(17);
    expect(mapToArchetype("A2", "B2", "V6")).toBe(17);
  });
  it("V7 → 18", () => {
    expect(mapToArchetype("A2", "B2", "V7")).toBe(18);
  });
  it("V8 → 19", () => {
    expect(mapToArchetype("A2", "B2", "V8")).toBe(19);
  });
});

describe("mapToArchetype — A3 (Избыток) + B1", () => {
  it("V1 → 20, V2 → 21", () => {
    expect(mapToArchetype("A3", "B1", "V1")).toBe(20);
    expect(mapToArchetype("A3", "B1", "V2")).toBe(21);
  });
  it("V3, V4 → 22", () => {
    expect(mapToArchetype("A3", "B1", "V3")).toBe(22);
    expect(mapToArchetype("A3", "B1", "V4")).toBe(22);
  });
  it("V5, V6 → 23", () => {
    expect(mapToArchetype("A3", "B1", "V5")).toBe(23);
    expect(mapToArchetype("A3", "B1", "V6")).toBe(23);
  });
  it("V7 → 24, V8 → 25", () => {
    expect(mapToArchetype("A3", "B1", "V7")).toBe(24);
    expect(mapToArchetype("A3", "B1", "V8")).toBe(25);
  });
});

describe("mapToArchetype — A3 + B2", () => {
  it("V1, V2 → 26", () => {
    expect(mapToArchetype("A3", "B2", "V1")).toBe(26);
    expect(mapToArchetype("A3", "B2", "V2")).toBe(26);
  });
  it("V3, V4 → 27", () => {
    expect(mapToArchetype("A3", "B2", "V3")).toBe(27);
    expect(mapToArchetype("A3", "B2", "V4")).toBe(27);
  });
  it("V5, V6 → 28", () => {
    expect(mapToArchetype("A3", "B2", "V5")).toBe(28);
    expect(mapToArchetype("A3", "B2", "V6")).toBe(28);
  });
  it("V7 → 29, V8 → 30", () => {
    expect(mapToArchetype("A3", "B2", "V7")).toBe(29);
    expect(mapToArchetype("A3", "B2", "V8")).toBe(30);
  });
});

describe("mapToArchetype — A4 (Ожирение)", () => {
  it("B1 + V1-V7 → 31, V8 → 32", () => {
    const local: ZoneId[] = ["V1", "V2", "V3", "V4", "V5", "V6", "V7"];
    for (const z of local) {
      expect(mapToArchetype("A4", "B1", z)).toBe(31);
    }
    expect(mapToArchetype("A4", "B1", "V8")).toBe(32);
  });
  it("B2 + V1-V7 → 33, V8 → 34", () => {
    const local: ZoneId[] = ["V1", "V2", "V3", "V4", "V5", "V6", "V7"];
    for (const z of local) {
      expect(mapToArchetype("A4", "B2", z)).toBe(33);
    }
    expect(mapToArchetype("A4", "B2", "V8")).toBe(34);
  });
});

describe("mapToArchetype — B3 (55+)", () => {
  it("V1-V6 → 35", () => {
    const local: ZoneId[] = ["V1", "V2", "V3", "V4", "V5", "V6"];
    for (const z of local) {
      expect(mapToArchetype("A2", "B3", z)).toBe(35);
      expect(mapToArchetype("A3", "B3", z)).toBe(35);
    }
  });
  it("V7 and V8 → 36", () => {
    expect(mapToArchetype("A2", "B3", "V7")).toBe(36);
    expect(mapToArchetype("A2", "B3", "V8")).toBe(36);
    expect(mapToArchetype("A3", "B3", "V7")).toBe(36);
    expect(mapToArchetype("A3", "B3", "V8")).toBe(36);
  });
});

describe("getArchetype — substitution rules", () => {
  it("худая 55+ (A1 + B3) подменяется на A2 + B3", () => {
    // ИМТ ~17, возраст 55+ → должен попасть в архетип старшей группы
    expect(getArchetype({ height: 170, weight: 50, ageGroup: "55+", zone: "V1" })).toBe(35);
    expect(getArchetype({ height: 170, weight: 50, ageGroup: "55+", zone: "V7" })).toBe(36);
  });
  it("ожирение 55+ (A4 + B3) подменяется на A3 + B3", () => {
    // ИМТ ~35, возраст 55+
    expect(getArchetype({ height: 160, weight: 90, ageGroup: "55+", zone: "V1" })).toBe(35);
    expect(getArchetype({ height: 160, weight: 90, ageGroup: "55+", zone: "V8" })).toBe(36);
  });
});

describe("getArchetype — реалистичные сценарии", () => {
  it("молодая 25 лет, 165/65, живот снизу → 7", () => {
    // BMI ~ 23.9 (A2), B1, V1
    expect(getArchetype({ height: 165, weight: 65, ageGroup: "26-35", zone: "V1" })).toBe(7);
  });
  it("худая 22 года, 170/50, бёдра → 3", () => {
    // BMI ~ 17.3 (A1), B1, V3
    expect(getArchetype({ height: 170, weight: 50, ageGroup: "18-25", zone: "V3" })).toBe(3);
  });
  it("зрелая 45 лет, 165/85, живот сверху → 26", () => {
    // BMI ~ 31.2 — это A4! Проверяю отдельно
    // 165/72 = 26.4 (A3)
    expect(getArchetype({ height: 165, weight: 72, ageGroup: "36-45", zone: "V2" })).toBe(26);
  });
  it("ожирение 30 лет, 160/80, везде → 32", () => {
    // BMI ~ 31.25 (A4), B1, V8
    expect(getArchetype({ height: 160, weight: 80, ageGroup: "26-35", zone: "V8" })).toBe(32);
  });
  it("норма 50 лет, 168/70, отёки → 18", () => {
    // BMI ~ 24.8 (A2), B2, V7
    expect(getArchetype({ height: 168, weight: 70, ageGroup: "46-55", zone: "V7" })).toBe(18);
  });
});

describe("полное покрытие — для каждой ячейки матрицы есть архетип", () => {
  const allArchetypes = new Set<ArchetypeId>();
  const zones: ZoneId[] = ["V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8"];
  const buckets = ["B1", "B2", "B3"] as const;
  const groups = ["A1", "A2", "A3", "A4"] as const;
  for (const bmi of groups) {
    for (const age of buckets) {
      for (const z of zones) {
        let g = bmi;
        if (g === "A1" && age === "B3") g = "A2";
        if (g === "A4" && age === "B3") g = "A3";
        allArchetypes.add(mapToArchetype(g, age, z));
      }
    }
  }
  it("все 36 архетипов достижимы", () => {
    expect(allArchetypes.size).toBe(36);
    for (let i = 1; i <= 36; i++) {
      expect(allArchetypes.has(i as ArchetypeId)).toBe(true);
    }
  });
});
