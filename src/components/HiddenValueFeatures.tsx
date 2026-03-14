interface HiddenValueFeaturesProps {
  features: string[];
}

export function HiddenValueFeatures({ features }: HiddenValueFeaturesProps) {
  if (features.length === 0) return null;

  return (
    <div className="card border-green-500/25 bg-green-500/5">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-500/20">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </span>
        <h3 className="font-semibold text-green-400">Hidden Value</h3>
      </div>
      <p className="mb-3 text-sm text-[var(--color-text-muted)]">
        Your property has features that are rare in this neighborhood.
        Highlight these in your listing to stand out:
      </p>
      <div className="flex flex-wrap gap-2">
        {features.map((f) => (
          <span
            key={f}
            className="rounded-full border border-green-500/25 bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-400"
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}
