"use client";

import { useState } from "react";
import MaleExit from "./steps/MaleExit";
import Step1Height from "./steps/Step1Height";
import Step2Weight from "./steps/Step2Weight";
import Step3Age from "./steps/Step3Age";
import Step4Gender from "./steps/Step4Gender";
import Welcome from "./steps/Welcome";
import {
  AgeGroup,
  Gender,
  INITIAL_QUIZ_STATE,
  QuizState,
} from "./lib/types";

export type Step =
  | "welcome"
  | "q1"
  | "q2"
  | "q3"
  | "q4"
  | "q5"
  | "q6"
  | "q7"
  | "q8"
  | "maleExit"
  | "loader"
  | "result";

export default function QuizContainer() {
  const [step, setStep] = useState<Step>("welcome");
  const [state, setState] = useState<QuizState>(INITIAL_QUIZ_STATE);

  function update<K extends keyof QuizState>(key: K, value: QuizState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function handleHeight(height: number) {
    update("height", height);
    setStep("q2");
  }

  function handleWeight(weight: number) {
    update("weight", weight);
    setStep("q3");
  }

  function handleAge(ageGroup: AgeGroup) {
    update("ageGroup", ageGroup);
    setStep("q4");
  }

  function handleGender(gender: Gender) {
    update("gender", gender);
    setStep(gender === "female" ? "q5" : "maleExit");
  }

  function handleEmail(email: string) {
    // Заглушка для CRM/аналитики; на Этапе 7 заменю на trackEvent
    if (typeof window !== "undefined") {
      console.log("[event] quiz_male_email_submitted", { email });
    }
  }

  switch (step) {
    case "welcome":
      return <Welcome onStart={() => setStep("q1")} />;

    case "q1":
      return (
        <Step1Height
          value={state.height}
          onSubmit={handleHeight}
          onBack={() => setStep("welcome")}
        />
      );

    case "q2":
      return (
        <Step2Weight
          value={state.weight}
          onSubmit={handleWeight}
          onBack={() => setStep("q1")}
        />
      );

    case "q3":
      return (
        <Step3Age
          value={state.ageGroup}
          onSelect={handleAge}
          onBack={() => setStep("q2")}
        />
      );

    case "q4":
      return (
        <Step4Gender
          value={state.gender}
          onSelect={handleGender}
          onBack={() => setStep("q3")}
        />
      );

    case "maleExit":
      return (
        <MaleExit
          onClose={() => setStep("welcome")}
          onSubmitEmail={handleEmail}
        />
      );

    // Q5–Q8 + Loader + Result — добавляются в следующих этапах
    case "q5":
    case "q6":
    case "q7":
    case "q8":
    case "loader":
    case "result":
      return (
        <section className="screen-enter mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center gap-4 px-5 py-12 text-center sm:px-6">
          <h2 className="heading-lg">Скоро…</h2>
          <p className="body-text text-text-secondary">
            Этот экран в разработке (этап {step}).
          </p>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => setStep("welcome")}
          >
            Вернуться в начало
          </button>
        </section>
      );
  }
}
