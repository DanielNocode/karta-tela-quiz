import { describe, expect, it } from "vitest";
import { ARCHETYPES } from "./archetypes";
import { ArchetypeId } from "./types";

describe("ARCHETYPES — полнота", () => {
  it("содержит все 36 архетипов", () => {
    for (let i = 1; i <= 36; i++) {
      const a = ARCHETYPES[i as ArchetypeId];
      expect(a, `Архетип #${i} отсутствует`).toBeDefined();
      expect(a.id).toBe(i);
    }
  });

  it("у каждого архетипа все поля заполнены и не пустые", () => {
    for (let i = 1; i <= 36; i++) {
      const a = ARCHETYPES[i as ArchetypeId];
      expect(a.title.length, `#${i} title`).toBeGreaterThan(0);
      expect(a.summary.length, `#${i} summary`).toBeGreaterThan(20);
      expect(a.analysis.length, `#${i} analysis`).toBeGreaterThan(50);
      expect(a.notHelpful.length, `#${i} notHelpful`).toBeGreaterThan(20);
      expect(a.recommendations.length, `#${i} recommendations`).toBeGreaterThan(50);
      expect(a.webinarPitch.length, `#${i} webinarPitch`).toBeGreaterThan(50);
    }
  });

  it("summary каждого архетипа содержит все 5 плейсхолдеров", () => {
    const required = ["{age}", "{height}", "{weight}", "{bmi}", "{zone}"];
    for (let i = 1; i <= 36; i++) {
      const summary = ARCHETYPES[i as ArchetypeId].summary;
      for (const p of required) {
        expect(summary.includes(p), `#${i} summary missing ${p}`).toBe(true);
      }
    }
  });
});
