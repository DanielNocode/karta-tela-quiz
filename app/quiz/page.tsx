import LabelPill from "./components/LabelPill";
import StarsBackground from "./components/StarsBackground";

export default function QuizPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <StarsBackground />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <LabelPill className="mb-8">ЭФИР · КРИСТИНА ПРЯДУН</LabelPill>
        <h1 className="heading-xl text-center max-w-2xl">
          Карта твоего тела
        </h1>
        <p className="caption mt-4 text-center max-w-md">
          Каркас и компоненты собраны. Дальше — экраны квиза.
        </p>
      </div>
    </main>
  );
}
