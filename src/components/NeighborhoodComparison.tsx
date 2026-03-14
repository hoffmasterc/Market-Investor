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
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Neighborhood Feature Comparison</h2>
      <div className="card space-y-2">
        {sorted.map((item) => (
          <div key={item.feature} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    item.propertyHas ? "bg-green-400" : "bg-slate-500"
                  }`}
                />
                {item.feature}
              </span>
              <span className="text-[var(--color-text-muted)]">
                {item.marketPenetration}% of market
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-700">
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
