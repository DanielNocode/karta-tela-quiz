interface LabelPillProps {
  children: React.ReactNode;
  className?: string;
}

export default function LabelPill({ children, className = "" }: LabelPillProps) {
  return <span className={`label-pill ${className}`}>{children}</span>;
}
