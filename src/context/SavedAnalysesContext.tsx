"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { AnalysisResult } from "@/lib/types";

interface SavedAnalysesContextValue {
  analyses: AnalysisResult[];
  save: (result: AnalysisResult) => void;
  remove: (id: string) => void;
  getById: (id: string) => AnalysisResult | undefined;
}

const SavedAnalysesContext = createContext<SavedAnalysesContextValue | null>(null);

const STORAGE_KEY = "roi-calc-saved";

export function SavedAnalysesProvider({ children }: { children: React.ReactNode }) {
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setAnalyses(JSON.parse(stored));
    } catch {
      // ignore corrupt data
    }
  }, []);

  const persist = useCallback((data: AnalysisResult[]) => {
    setAnalyses(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const save = useCallback(
    (result: AnalysisResult) => {
      persist([result, ...analyses.filter((a) => a.id !== result.id)]);
    },
    [analyses, persist]
  );

  const remove = useCallback(
    (id: string) => {
      persist(analyses.filter((a) => a.id !== id));
    },
    [analyses, persist]
  );

  const getById = useCallback(
    (id: string) => analyses.find((a) => a.id === id),
    [analyses]
  );

  return (
    <SavedAnalysesContext.Provider value={{ analyses, save, remove, getById }}>
      {children}
    </SavedAnalysesContext.Provider>
  );
}

export function useSavedAnalyses() {
  const ctx = useContext(SavedAnalysesContext);
  if (!ctx) throw new Error("useSavedAnalyses must be used within SavedAnalysesProvider");
  return ctx;
}
