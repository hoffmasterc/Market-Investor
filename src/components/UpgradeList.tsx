import type { UpgradeOpportunity } from "@/lib/types";
import { formatRange, formatPercent } from "@/utils/format";

interface UpgradeListProps {
  upgrades: UpgradeOpportunity[];
}

const PRIORITY_STYLES = {
  high: "bg-green-500/20 text-green-400 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  low: "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

export function UpgradeList({ upgrades }: UpgradeListProps) {
  if (upgrades.length === 0) {
    return (
      <div className="card text-center text-[var(--color-text-muted)]">
        Your property already has all tracked features!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Top Upgrade Opportunities</h2>
      {upgrades.map((upgrade) => (
        <div key={upgrade.feature} className="card space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold">{upgrade.feature}</h3>
            <span
              className={`rounded-full border px-2 py-0.5 text-xs font-medium ${PRIORITY_STYLES[upgrade.priority]}`}
            >
              {upgrade.priority}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-[var(--color-text-muted)]">Cost</p>
              <p className="font-medium">
                {formatRange(upgrade.estimatedCost[0], upgrade.estimatedCost[1])}
              </p>
            </div>
            <div>
              <p className="text-[var(--color-text-muted)]">Rent Lift</p>
              <p className="font-medium">
                {formatRange(
                  upgrade.estimatedRentLift[0],
                  upgrade.estimatedRentLift[1]
                )}
                /mo
              </p>
            </div>
            <div>
              <p className="text-[var(--color-text-muted)]">ROI</p>
              <p className="font-semibold text-[var(--color-primary)]">
                {formatPercent(upgrade.roiPercent)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
