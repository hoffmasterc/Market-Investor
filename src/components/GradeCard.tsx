import { gradeColor, gradeBgColor, formatRange } from "@/utils/format";

interface GradeCardProps {
  grade: string;
  rentLift: [number, number];
}

export function GradeCard({ grade, rentLift }: GradeCardProps) {
  return (
    <div className={`card flex items-center gap-4 border ${gradeBgColor(grade)}`}>
      <div
        className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl text-3xl font-black ${gradeColor(grade)}`}
      >
        {grade}
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)]">
          Upgrade Potential
        </p>
        <p className="text-lg font-semibold">
          {formatRange(rentLift[0], rentLift[1])}
          <span className="text-sm font-normal text-[var(--color-text-muted)]">
            {" "}
            /mo potential
          </span>
        </p>
      </div>
    </div>
  );
}
