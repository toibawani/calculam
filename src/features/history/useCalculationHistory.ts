import { useEffect, useState } from "react";
import type { CalculationHistoryItem } from "./historyTypes";

const STORAGE_KEY = "calculam-calculation-history";
const MAX_HISTORY_ITEMS = 50;

function loadHistory(): CalculationHistoryItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

export function useCalculationHistory() {
  const [history, setHistory] =
    useState<CalculationHistoryItem[]>(loadHistory);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(history),
    );
  }, [history]);

  const addCalculation = (
    expression: string,
    result: string,
  ) => {
    const item: CalculationHistoryItem = {
      id: crypto.randomUUID(),
      expression,
      result,
      timestamp: Date.now(),
    };

    setHistory((current) => [
      item,
      ...current,
    ].slice(0, MAX_HISTORY_ITEMS));
  };

  const removeCalculation = (id: string) => {
    setHistory((current) =>
      current.filter((item) => item.id !== id),
    );
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addCalculation,
    removeCalculation,
    clearHistory,
  };
}