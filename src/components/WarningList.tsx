interface WarningListProps {
  warnings: string[];
}

export function WarningList({ warnings }: WarningListProps) {
  if (warnings.length === 0) return null;

  return (
    <div className="card border-yellow-500/25 bg-yellow-500/5 space-y-3">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-500/20">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </span>
        <h3 className="font-semibold text-yellow-400">Over-Improvement Warnings</h3>
      </div>
      <div className="space-y-2">
        {warnings.map((warning, i) => (
          <p key={i} className="text-sm leading-relaxed text-yellow-200/80">
            {warning}
          </p>
        ))}
      </div>
    </div>
  );
}
