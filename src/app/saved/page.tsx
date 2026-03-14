"use client";

import Link from "next/link";
import { useSavedAnalyses } from "@/context/SavedAnalysesContext";
import { gradeColor, formatRange, formatPropertyType } from "@/utils/format";

export default function SavedPage() {
  const { analyses, remove } = useSavedAnalyses();

  return (
    <div className="space-y-4 py-4">
      <h1 className="text-2xl font-bold">Saved Analyses</h1>

      {analyses.length === 0 ? (
        <div className="card space-y-3 text-center">
          <p className="text-[var(--color-text-muted)]">
            No saved analyses yet.
          </p>
          <Link href="/analyze" className="btn-primary inline-block">
            Analyze a Property
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {analyses.map((analysis) => (
            <div key={analysis.id} className="card space-y-2">
              <div className="flex items-start justify-between">
                <Link
                  href={`/results?id=${analysis.id}`}
                  className="flex-1 space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xl font-black ${gradeColor(analysis.overallGrade)}`}
                    >
                      {analysis.overallGrade}
                    </span>
                    <span className="font-semibold">
                      {analysis.property.zipCode}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {formatPropertyType(analysis.property.propertyType)} &middot;{" "}
                    {analysis.property.bedrooms}bd/
                    {analysis.property.bathrooms}ba
                  </p>
                  <p className="text-sm">
                    Potential:{" "}
                    {formatRange(
                      analysis.estimatedTotalRentLift[0],
                      analysis.estimatedTotalRentLift[1]
                    )}
                    /mo
                  </p>
                </Link>
                <button
                  onClick={() => remove(analysis.id)}
                  className="rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-red-500/20 hover:text-red-400"
                  aria-label="Remove analysis"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">
                {new Date(analysis.analyzedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
