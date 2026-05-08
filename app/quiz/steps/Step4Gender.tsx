"use client";

import OptionButton from "../components/OptionButton";
import QuestionWrapper from "../components/QuestionWrapper";
import { Gender } from "../lib/types";

interface Step4GenderProps {
  value: Gender | null;
  onSelect: (value: Gender) => void;
  onBack: () => void;
}

export default function Step4Gender({ value, onSelect, onBack }: Step4GenderProps) {
  return (
    <QuestionWrapper step={4} onBack={onBack} title="Твой пол?">
      <div className="options-stagger flex flex-col gap-3">
        <OptionButton
          label="Женский"
          selected={value === "female"}
          onClick={() => onSelect("female")}
        />
        <OptionButton
          label="Мужской"
          selected={value === "male"}
          onClick={() => onSelect("male")}
        />
      </div>
    </QuestionWrapper>
  );
}
