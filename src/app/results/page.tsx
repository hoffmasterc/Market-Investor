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

function ResultsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { getById } = useSavedAnalyses();

  const result = id ? getById(id) : undefined;

  if (!result) {
    return (
      <div className="space-y-4 py-8 text-center">
        <p className="text-[var(--color-text-muted)]">Analysis not found.</p>
        <Link href="/analyze" className="btn-primary inline-block">
          New Analysis
        </Link>
      </div>
    );
  }

  const { property } = result;

  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-bold">Analysis Results</h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          {property.zipCode} &middot;{" "}
          {property.propertyType.replace("_", " ")} &middot;{" "}
          {property.bedrooms}bd/{property.bathrooms}ba
        </p>
      </div>

      <GradeCard grade={result.overallGrade} rentLift={result.estimatedTotalRentLift} />
      <UpgradeList upgrades={result.topUpgrades} />
      <HiddenValueFeatures features={result.hiddenValueFeatures} />
      <WarningList warnings={result.overImprovementWarnings} />
      <NeighborhoodComparison data={result.neighborhoodComparison} />

      <div className="flex gap-3">
        <Link href="/analyze" className="btn-primary flex-1 text-center">
          New Analysis
        </Link>
        <Link
          href="/saved"
          className="flex-1 rounded-xl border border-[var(--color-border)] py-3 text-center text-sm font-semibold text-[var(--color-text-muted)] transition-colors hover:text-white"
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
        <div className="py-8 text-center text-[var(--color-text-muted)]">
          Loading...
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
