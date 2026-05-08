"use client";

import LabelPill from "../components/LabelPill";

interface WelcomeProps {
  onStart: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <section className="screen-enter mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center gap-8 px-5 py-12 sm:px-6">
      <LabelPill>ЭФИР · КРИСТИНА ПРЯДУН</LabelPill>

      <h1 className="heading-xl text-center">
        Узнай, почему именно
        <br className="hidden sm:block" /> у тебя не уходит
        <br className="hidden sm:block" /> эта зона
      </h1>

      <p className="body-text max-w-xl text-center text-text-secondary">
        8 вопросов — и я расскажу, где на самом деле живёт твой лишний вес.
        И почему диеты, спорт и курсы у тебя не работают.
      </p>

      <button type="button" className="btn-primary" onClick={onStart}>
        НАЧАТЬ → 60 секунд
      </button>

      <p className="caption text-center">
        Без регистрации, без спама.
        <br />
        Только честный разбор твоей зоны.
      </p>
    </section>
  );
}
