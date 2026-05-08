"use client";

import { useState } from "react";

interface MaleExitProps {
  onClose: () => void;
  onSubmitEmail: (email: string) => void;
}

export default function MaleExit({ onClose, onSubmitEmail }: MaleExitProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validEmail) return;
    onSubmitEmail(email);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="screen-enter mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center gap-6 px-5 py-12 text-center sm:px-6">
        <h1 className="heading-xl">Спасибо</h1>
        <p className="body-text text-text-secondary max-w-md">
          Дадим знать, когда откроется мужской поток. А пока береги себя.
        </p>
        <button type="button" className="btn-ghost" onClick={onClose}>
          Закрыть
        </button>
      </section>
    );
  }

  return (
    <section className="screen-enter mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center gap-6 px-5 py-12 sm:px-6">
      <h1 className="heading-xl text-center">Этот эфир для женщин</h1>
      <p className="body-text text-center text-text-secondary max-w-md">
        Эфир разбирает женскую психосоматику и гормональную историю.
        Если интересно — оставь почту, пришлём, когда будет мужской поток.
      </p>

      <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-4">
        <input
          type="email"
          className="input-text"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          aria-label="Email"
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={!validEmail}
        >
          ОСТАВИТЬ ПОЧТУ
        </button>
      </form>

      <button type="button" className="btn-ghost" onClick={onClose}>
        Закрыть
      </button>
    </section>
  );
}
