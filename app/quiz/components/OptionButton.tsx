"use client";

import { Check } from "lucide-react";

interface OptionButtonProps {
  label: string;
  selected?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  multiSelect?: boolean;
  className?: string;
}

export default function OptionButton({
  label,
  selected = false,
  onClick,
  icon,
  multiSelect = false,
  className = "",
}: OptionButtonProps) {
  return (
    <button
      type="button"
      className={`btn-option ${selected ? "selected" : ""} ${className}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      {icon ? (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-subtle bg-[rgba(40,30,80,0.4)] text-accent-primary">
          {icon}
        </span>
      ) : null}
      <span className="flex-1 text-left">{label}</span>
      {multiSelect ? (
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
            selected
              ? "border-accent-primary bg-accent-primary text-bg-deep"
              : "border-subtle bg-transparent text-transparent"
          }`}
          aria-hidden
        >
          <Check size={14} strokeWidth={3} />
        </span>
      ) : null}
    </button>
  );
}
