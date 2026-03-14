"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FeatureSelector } from "@/components/FeatureSelector";
import { analyzeProperty } from "@/services/analysisEngine";
import { useSavedAnalyses } from "@/context/SavedAnalysesContext";
import type { PropertyType } from "@/lib/types";

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "single_family", label: "Single Family" },
  { value: "duplex_triplex", label: "Duplex / Triplex" },
  { value: "small_multifamily", label: "Small Multifamily" },
];

export default function AnalyzePage() {
  const router = useRouter();
  const { save } = useSavedAnalyses();

  const [zipCode, setZipCode] = useState("");
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [propertyType, setPropertyType] = useState<PropertyType>("single_family");
  const [features, setFeatures] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const isValid = /^\d{5}$/.test(zipCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsAnalyzing(true);

    // Simulate processing delay for UX
    setTimeout(() => {
      const result = analyzeProperty({
        zipCode,
        bedrooms,
        bathrooms,
        propertyType,
        currentFeatures: features,
      });
      save(result);
      router.push(`/results?id=${result.id}`);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-bold">Analyze Property</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Enter your property details to discover upgrade opportunities.
        </p>
      </div>

      {/* ZIP Code */}
      <div className="space-y-1">
        <label htmlFor="zip" className="text-sm font-medium text-[var(--color-text-muted)]">
          ZIP Code
        </label>
        <input
          id="zip"
          type="text"
          inputMode="numeric"
          maxLength={5}
          placeholder="e.g. 10001"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-lg outline-none transition-colors focus:border-[var(--color-primary)]"
        />
      </div>

      {/* Property Type */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-[var(--color-text-muted)]">
          Property Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PROPERTY_TYPES.map((pt) => (
            <button
              key={pt.value}
              type="button"
              onClick={() => setPropertyType(pt.value)}
              className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                propertyType === pt.value
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/20 text-[var(--color-primary)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)]"
              }`}
            >
              {pt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="beds" className="text-sm font-medium text-[var(--color-text-muted)]">
            Bedrooms
          </label>
          <select
            id="beds"
            value={bedrooms}
            onChange={(e) => setBedrooms(Number(e.target.value))}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 outline-none focus:border-[var(--color-primary)]"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="baths" className="text-sm font-medium text-[var(--color-text-muted)]">
            Bathrooms
          </label>
          <select
            id="baths"
            value={bathrooms}
            onChange={(e) => setBathrooms(Number(e.target.value))}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 outline-none focus:border-[var(--color-primary)]"
          >
            {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Feature Selector */}
      <FeatureSelector selected={features} onChange={setFeatures} />

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || isAnalyzing}
        className="btn-primary w-full"
      >
        {isAnalyzing ? "Analyzing..." : "Analyze Property"}
      </button>
    </form>
  );
}
