"use client";

import { PROPERTY_FEATURES } from "@/lib/types";

interface FeatureSelectorProps {
  selected: string[];
  onChange: (features: string[]) => void;
}

export function FeatureSelector({ selected, onChange }: FeatureSelectorProps) {
  const toggle = (feature: string) => {
    onChange(
      selected.includes(feature)
        ? selected.filter((f) => f !== feature)
        : [...selected, feature]
    );
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[var(--color-text-muted)]">
        Current Features ({selected.length} selected)
      </label>
      <div className="flex flex-wrap gap-2">
        {PROPERTY_FEATURES.map((feature) => {
          const isSelected = selected.includes(feature);
          return (
            <button
              key={feature}
              type="button"
              onClick={() => toggle(feature)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                isSelected
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/20 text-[var(--color-primary)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)]"
              }`}
            >
              {isSelected ? "✓ " : ""}
              {feature}
            </button>
          );
        })}
      </div>
    </div>
  );
}
