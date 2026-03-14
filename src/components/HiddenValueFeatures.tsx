interface HiddenValueFeaturesProps {
  features: string[];
}

export function HiddenValueFeatures({ features }: HiddenValueFeaturesProps) {
  if (features.length === 0) return null;

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-[var(--color-success)]">
        Hidden Value Features
      </h2>
      <div className="card border-green-500/30 bg-green-500/10">
        <p className="mb-2 text-sm text-[var(--color-text-muted)]">
          Your property has rare features that competitors lack:
        </p>
        <div className="flex flex-wrap gap-2">
          {features.map((f) => (
            <span
              key={f}
              className="rounded-full border border-green-500/30 bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
