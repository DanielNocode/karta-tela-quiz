"use client";

import { useState } from "react";
import NumberInput from "../components/NumberInput";
import QuestionWrapper from "../components/QuestionWrapper";

interface Step2WeightProps {
  value: number | null;
  onSubmit: (value: number) => void;
  onBack: () => void;
}

const MIN = 40;
const MAX = 150;
const DEFAULT = 65;

export default function Step2Weight({ value, onSubmit, onBack }: Step2WeightProps) {
  const [draft, setDraft] = useState<number>(value ?? DEFAULT);
  const error = !Number.isFinite(draft) || draft < MIN || draft > MAX
    ? "Введи реальный вес"
    : null;

  return (
    <QuestionWrapper
      step={2}
      onBack={onBack}
      title="Какой у тебя вес?"
      footer={
        <button
          type="button"
          className="btn-primary"
          onClick={() => onSubmit(draft)}
          disabled={Boolean(error)}
        >
          ДАЛЬШЕ →
        </button>
      }
    >
      <NumberInput
        value={draft}
        onChange={setDraft}
        min={MIN}
        max={MAX}
        unit="кг"
        error={error}
        hint="Не для оценки. Чтобы рассчитать твой ИМТ и подобрать точные рекомендации."
      />
    </QuestionWrapper>
  );
}
