import type { UpgradeOpportunity } from "@/lib/types";
import { formatCurrency, formatRange, formatPercent } from "@/utils/format";

interface UpgradeListProps {
  upgrades: UpgradeOpportunity[];
}

const PRIORITY_BADGE = {
  high: {
    bg: "bg-green-500/15",
    text: "text-green-400",
    border: "border-green-500/25",
    label: "High ROI",
  },
  medium: {
    bg: "bg-yellow-500/15",
    text: "text-yellow-400",
    border: "border-yellow-500/25",
    label: "Medium ROI",
  },
  low: {
    bg: "bg-slate-500/15",
    text: "text-slate-400",
    border: "border-slate-500/25",
    label: "Low ROI",
  },
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
      {upgrades.map((upgrade, index) => {
        const badge = PRIORITY_BADGE[upgrade.priority];
        return (
          <div key={upgrade.feature} className="card space-y-3">
            {/* Header row */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/20 text-xs font-bold text-[var(--color-primary)]">
                  {index + 1}
                </span>
                <h3 className="font-semibold leading-tight">{upgrade.feature}</h3>
              </div>
              <span
                className={`flex-shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${badge.bg} ${badge.text} ${badge.border}`}
              >
                {badge.label}
              </span>
            </div>

            {/* Rent lift highlight */}
            <div className="rounded-lg bg-[var(--color-primary)]/10 px-3 py-2">
              <p className="text-xs font-medium text-[var(--color-text-muted)]">
                Estimated Rent Lift
              </p>
              <p className="text-lg font-bold text-[var(--color-primary)]">
                +{formatRange(upgrade.estimatedRentLift[0], upgrade.estimatedRentLift[1])}
                <span className="text-sm font-normal text-[var(--color-text-muted)]"> /mo</span>
              </p>
            </div>

            {/* Details row */}
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Upgrade Cost</p>
                <p className="font-medium">
                  {formatCurrency(upgrade.estimatedCost[0])} – {formatCurrency(upgrade.estimatedCost[1])}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[var(--color-text-muted)]">Annual ROI</p>
                <p className="font-bold text-[var(--color-success)]">
                  {formatPercent(upgrade.roiPercent)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
