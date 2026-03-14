"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { useSavedAnalyses } from "@/context/SavedAnalysesContext";
import { GradeCard } from "@/components/GradeCard";
import { UpgradeList } from "@/components/UpgradeList";
import { HiddenValueFeatures } from "@/components/HiddenValueFeatures";
import { NeighborhoodComparison } from "@/components/NeighborhoodComparison";
import { WarningList } from "@/components/WarningList";
import { InvestorTip } from "@/components/InvestorTip";
import { formatPropertyType } from "@/utils/format";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold tracking-tight">{children}</h2>
  );
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { getById } = useSavedAnalyses();

  const result = id ? getById(id) : undefined;

  if (!result) {
    return (
      <div className="space-y-4 py-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface)]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)]">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
        <p className="text-[var(--color-text-muted)]">
          Analysis not found. It may have been removed.
        </p>
        <Link href="/analyze" className="btn-primary inline-block">
          Start New Analysis
        </Link>
      </div>
    );
  }

  const { property } = result;

  return (
    <div className="space-y-6 py-4 pb-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Analysis Results</h1>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-[var(--color-text-muted)]">
          <span className="font-medium text-[var(--color-text)]">
            {property.zipCode}
          </span>
          <span aria-hidden="true">&middot;</span>
          <span>{formatPropertyType(property.propertyType)}</span>
          <span aria-hidden="true">&middot;</span>
          <span>
            {property.bedrooms} bd / {property.bathrooms} ba
          </span>
        </div>
      </div>

      {/* Upgrade Potential Letter Grade */}
      <section>
        <GradeCard
          grade={result.overallGrade}
          gradeScore={result.gradeScore}
          rentLift={result.estimatedTotalRentLift}
        />
      </section>

      {/* Top Upgrade Opportunities */}
      <section className="space-y-3">
        <SectionHeading>Top Upgrade Opportunities</SectionHeading>
        <UpgradeList upgrades={result.topUpgrades} />
      </section>

      {/* Hidden Value Features */}
      {result.hiddenValueFeatures.length > 0 && (
        <section className="space-y-3">
          <SectionHeading>Hidden Value</SectionHeading>
          <HiddenValueFeatures features={result.hiddenValueFeatures} />
        </section>
      )}

      {/* Neighborhood Comparison */}
      <section className="space-y-3">
        <SectionHeading>Neighborhood Comparison</SectionHeading>
        <NeighborhoodComparison data={result.neighborhoodComparison} />
      </section>

      {/* Over-Improvement Warnings */}
      {result.overImprovementWarnings.length > 0 && (
        <section className="space-y-3">
          <SectionHeading>Warnings</SectionHeading>
          <WarningList warnings={result.overImprovementWarnings} />
        </section>
      )}

      {/* Investor Tip */}
      <section className="space-y-3">
        <SectionHeading>Investor Tip</SectionHeading>
        <InvestorTip tip={result.investorTip} />
      </section>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Link href="/analyze" className="btn-primary flex-1 text-center">
          New Analysis
        </Link>
        <Link
          href="/saved"
          className="flex-1 rounded-xl border border-[var(--color-border)] py-3 text-center text-sm font-semibold text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-text-muted)] hover:text-white"
        >
          View Saved
        </Link>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center gap-3 py-16 text-[var(--color-text-muted)]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <p className="text-sm">Loading results...</p>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
