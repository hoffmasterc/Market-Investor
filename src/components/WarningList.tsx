interface WarningListProps {
  warnings: string[];
}

export function WarningList({ warnings }: WarningListProps) {
  if (warnings.length === 0) return null;

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-[var(--color-warning)]">
        Over-Improvement Warnings
      </h2>
      <div className="space-y-2">
        {warnings.map((warning, i) => (
          <div
            key={i}
            className="card border-yellow-500/30 bg-yellow-500/10 text-sm text-yellow-200"
          >
            {warning}
          </div>
        ))}
      </div>
    </div>
  );
}
