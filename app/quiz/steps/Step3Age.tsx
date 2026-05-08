"use client";

import OptionButton from "../components/OptionButton";
import QuestionWrapper from "../components/QuestionWrapper";
import { AGE_OPTIONS, AgeGroup } from "../lib/types";

interface Step3AgeProps {
  value: AgeGroup | null;
  onSelect: (value: AgeGroup) => void;
  onBack: () => void;
}

export default function Step3Age({ value, onSelect, onBack }: Step3AgeProps) {
  return (
    <QuestionWrapper step={3} onBack={onBack} title="Сколько тебе лет?">
      <div className="options-stagger flex flex-col gap-3">
        {AGE_OPTIONS.map((age) => (
          <OptionButton
            key={age}
            label={age === "55+" ? "55 и больше" : `${age} лет`}
            selected={value === age}
            onClick={() => onSelect(age)}
          />
        ))}
      </div>
    </QuestionWrapper>
  );
}
