"use client";

import { ReactNode } from "react";
import BackButton from "./BackButton";
import ProgressBar from "./ProgressBar";

interface QuestionWrapperProps {
  step: number;
  totalSteps?: number;
  onBack?: () => void;
  title: string;
  subtitle?: string;
  caption?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export default function QuestionWrapper({
  step,
  totalSteps = 8,
  onBack,
  title,
  subtitle,
  caption,
  children,
  footer,
}: QuestionWrapperProps) {
  return (
    <section className="screen-enter mx-auto flex w-full max-w-2xl flex-col gap-8 px-5 pb-12 pt-6 sm:px-6 sm:pt-8">
      <header className="flex items-center justify-between gap-4">
        <div className="min-w-[60px]">
          {onBack ? <BackButton onClick={onBack} /> : null}
        </div>
        <div className="flex-1 max-w-sm">
          <ProgressBar step={step} total={totalSteps} />
        </div>
      </header>

      <div className="flex flex-col gap-3">
        <p className="heading-md">
          Вопрос {step} / {totalSteps}
        </p>
        <h1 className="heading-xl">{title}</h1>
        {subtitle ? <p className="body-text text-text-secondary">{subtitle}</p> : null}
        {caption ? <p className="caption">{caption}</p> : null}
      </div>

      <div className="flex flex-col gap-4">{children}</div>

      {footer ? <div className="flex flex-col items-center gap-3">{footer}</div> : null}
    </section>
  );
}
