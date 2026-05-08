"use client";

import { useState } from "react";
import NumberInput from "../components/NumberInput";
import QuestionWrapper from "../components/QuestionWrapper";

interface Step1HeightProps {
  value: number | null;
  onSubmit: (value: number) => void;
  onBack: () => void;
}

const MIN = 140;
const MAX = 200;
const DEFAULT = 165;

export default function Step1Height({ value, onSubmit, onBack }: Step1HeightProps) {
  const [draft, setDraft] = useState<number>(value ?? DEFAULT);
  const error = !Number.isFinite(draft) || draft < MIN || draft > MAX
    ? "Введи реальный рост"
    : null;

  return (
    <QuestionWrapper
      step={1}
      onBack={onBack}
      title="Какой у тебя рост?"
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
        unit="см"
        error={error}
      />
    </QuestionWrapper>
  );
}
