interface ComparisonItem {
  feature: string;
  marketPenetration: number;
  propertyHas: boolean;
}

interface NeighborhoodComparisonProps {
  data: ComparisonItem[];
}

export function NeighborhoodComparison({ data }: NeighborhoodComparisonProps) {
  const sorted = [...data].sort(
    (a, b) => b.marketPenetration - a.marketPenetration
  );

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-primary)]/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </span>
          <h3 className="font-semibold">vs. Neighborhood</h3>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
            You have
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-slate-500" />
            Missing
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {sorted.map((item) => (
          <div key={item.feature} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-medium">
                {item.propertyHas ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  </svg>
                )}
                {item.feature}
              </span>
              <span className="text-xs tabular-nums text-[var(--color-text-muted)]">
                {item.marketPenetration}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-700/60">
              <div
                className={`h-full rounded-full transition-all ${
                  item.propertyHas ? "bg-green-400" : "bg-slate-500"
                }`}
                style={{ width: `${item.marketPenetration}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
