interface ProgressBarProps {
  step: number; // 1..8
  total?: number; // default 8
}

export default function ProgressBar({ step, total = 8 }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(step, total));
  const percent = Math.round((clamped / total) * 100);

  return (
    <div className="flex w-full items-center gap-3">
      <div className="progress-bar flex-1">
        <div
          className="progress-bar-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="caption shrink-0 tabular-nums" aria-live="polite">
        {percent}%
      </span>
    </div>
  );
}
