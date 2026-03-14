interface InvestorTipProps {
  tip: string;
}

export function InvestorTip({ tip }: InvestorTipProps) {
  return (
    <div className="card border-[var(--color-primary)]/25 bg-[var(--color-primary)]/5">
      <div className="flex gap-3">
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/20">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </span>
        <div>
          <h3 className="mb-1 text-sm font-semibold text-[var(--color-primary)]">
            Investor Tip
          </h3>
          <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
            {tip}
          </p>
        </div>
      </div>
    </div>
  );
}
