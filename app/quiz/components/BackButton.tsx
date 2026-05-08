"use client";

import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export default function BackButton({ onClick, label = "Назад" }: BackButtonProps) {
  return (
    <button
      type="button"
      className="btn-ghost"
      onClick={onClick}
      aria-label={label}
    >
      <ChevronLeft size={16} aria-hidden />
      <span>{label}</span>
    </button>
  );
}
