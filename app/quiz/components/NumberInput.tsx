"use client";

import { useId } from "react";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  error?: string | null;
  hint?: string;
}

export default function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  error,
  hint,
}: NumberInputProps) {
  const id = useId();
  const numberId = `${id}-number`;
  const sliderId = `${id}-slider`;

  function handleChange(raw: string) {
    if (raw === "") {
      onChange(NaN);
      return;
    }
    const n = Number(raw);
    if (Number.isFinite(n)) onChange(n);
  }

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex items-baseline justify-center gap-3">
        <input
          id={numberId}
          type="number"
          inputMode="numeric"
          className="input-number"
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => handleChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        />
        {unit ? (
          <span className="caption font-semibold uppercase tracking-widest text-text-secondary">
            {unit}
          </span>
        ) : null}
      </div>

      <div className="w-full max-w-md px-2">
        <input
          id={sliderId}
          type="range"
          className="slider-input"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : min}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={unit ? `Значение в ${unit}` : "Значение"}
        />
        <div className="caption mt-2 flex justify-between text-text-muted">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>

      {error ? (
        <p id={`${id}-error`} className="caption text-error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="caption max-w-md text-center">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
