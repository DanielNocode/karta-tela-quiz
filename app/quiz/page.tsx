import QuizContainer from "./QuizContainer";
import StarsBackground from "./components/StarsBackground";

export default function QuizPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <StarsBackground />
      <div className="relative z-10">
        <QuizContainer />
      </div>
    </main>
  );
}
