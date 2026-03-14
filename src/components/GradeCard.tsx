import { gradeColor, gradeBgColor, formatRange } from "@/utils/format";

interface GradeCardProps {
  grade: string;
  gradeScore: number;
  rentLift: [number, number];
}

export function GradeCard({ grade, gradeScore, rentLift }: GradeCardProps) {
  // SVG ring dimensions
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progress = (gradeScore / 100) * circumference;
  const offset = circumference - progress;

  const ringColor = grade.startsWith("A")
    ? "stroke-green-400"
    : grade.startsWith("B")
      ? "stroke-blue-400"
      : grade.startsWith("C")
        ? "stroke-yellow-400"
        : "stroke-red-400";

  return (
    <div className={`card border ${gradeBgColor(grade)}`}>
      <div className="flex items-center gap-5">
        {/* Grade ring */}
        <div className="relative flex-shrink-0">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-700"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 60 60)"
              className={ringColor}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-black leading-none ${gradeColor(grade)}`}>
              {grade}
            </span>
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
              Grade
            </span>
          </div>
        </div>

        {/* Summary */}
        <div className="min-w-0 flex-1 space-y-1.5">
          <p className="text-sm font-medium text-[var(--color-text-muted)]">
            Upgrade Potential
          </p>
          <p className="text-xl font-bold leading-tight">
            {formatRange(rentLift[0], rentLift[1])}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            estimated monthly rent lift
          </p>
        </div>
      </div>
    </div>
  );
}
