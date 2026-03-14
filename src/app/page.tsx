import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8 py-8 text-center">
      <div className="space-y-3">
        <h1 className="text-3xl font-black tracking-tight">
          Property Upgrade{" "}
          <span className="text-[var(--color-primary)]">ROI</span> Analyzer
        </h1>
        <p className="text-[var(--color-text-muted)]">
          Discover which property upgrades increase rent the most in your ZIP
          code.
        </p>
      </div>

      <div className="space-y-4">
        <div className="card text-left">
          <h3 className="mb-2 font-semibold">How it works</h3>
          <ol className="space-y-2 text-sm text-[var(--color-text-muted)]">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/20 text-xs font-bold text-[var(--color-primary)]">
                1
              </span>
              Enter your ZIP code and property details
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/20 text-xs font-bold text-[var(--color-primary)]">
                2
              </span>
              Select which features your property currently has
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/20 text-xs font-bold text-[var(--color-primary)]">
                3
              </span>
              Get a personalized upgrade analysis with ROI rankings
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/20 text-xs font-bold text-[var(--color-primary)]">
                4
              </span>
              Save and compare analyses across properties
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="card text-center">
            <p className="text-2xl font-bold text-[var(--color-primary)]">16</p>
            <p className="text-xs text-[var(--color-text-muted)]">Features Tracked</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-[var(--color-success)]">A+</p>
            <p className="text-xs text-[var(--color-text-muted)]">Grade System</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-[var(--color-warning)]">ROI</p>
            <p className="text-xs text-[var(--color-text-muted)]">Rankings</p>
          </div>
        </div>
      </div>

      <Link href="/analyze" className="btn-primary inline-block">
        Analyze a Property
      </Link>
    </div>
  );
}
