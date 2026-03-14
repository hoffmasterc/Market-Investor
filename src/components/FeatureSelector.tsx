"use client";

import { INTERIOR_FEATURES, EXTERIOR_FEATURES } from "@/lib/types";

interface FeatureSelectorProps {
  selected: string[];
  onChange: (features: string[]) => void;
}

function FeatureGroup({
  label,
  features,
  selected,
  onToggle,
}: {
  label: string;
  features: readonly string[];
  selected: string[];
  onToggle: (feature: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-[var(--color-text)]">{label}</p>
      <div className="space-y-1">
        {features.map((feature) => {
          const isChecked = selected.includes(feature);
          return (
            <label
              key={feature}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-[var(--color-surface-hover)]"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(feature)}
                className="h-4 w-4 accent-[var(--color-primary)]"
              />
              <span
                className={`text-sm ${isChecked ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}`}
              >
                {feature}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
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
    <div className="space-y-3">
      <label className="text-sm font-medium text-[var(--color-text-muted)]">
        Current Features ({selected.length} selected)
      </label>
      <div className="card space-y-4">
        <FeatureGroup
          label="Interior"
          features={INTERIOR_FEATURES}
          selected={selected}
          onToggle={toggle}
        />
        <div className="border-t border-[var(--color-border)]" />
        <FeatureGroup
          label="Exterior"
          features={EXTERIOR_FEATURES}
          selected={selected}
          onToggle={toggle}
        />
      </div>
    </div>
  );
}
