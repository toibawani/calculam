import { useState } from "react";
import {
  ArrowLeft,
  Calculator,
  History,
  RotateCcw,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import BasicCalculator from "../features/calculator/BasicCalculator";
import UnitConverter from "../features/converter/UnitConverter";
import HistoryPanel from "../features/history/HistoryPanel";
import { useCalculationHistory } from "../features/history/useCalculationHistory";

export default function Workspace() {
  const [historyOpen, setHistoryOpen] = useState(false);

  const {
    history,
    removeCalculation,
    clearHistory,
  } = useCalculationHistory();

  return (
    <div className="workspace-page">
      <header className="workspace-header">
        <div className="workspace-brand">
          <Link
            to="/"
            className="back-button"
            aria-label="Back to home"
          >
            <ArrowLeft size={18} />
          </Link>

          <div className="brand-icon">
            <Calculator size={20} />
          </div>

          <div>
            <strong>Calculam</strong>
            <span>Workspace</span>
          </div>
        </div>

        <div className="workspace-actions">
          <button
            type="button"
            className="icon-button"
            title="History"
            aria-label="History"
            onClick={() => setHistoryOpen(true)}
          >
            <History size={19} />
          </button>

          <button
            type="button"
            className="icon-button"
            title="Reset"
            aria-label="Reset"
            onClick={() => window.location.reload()}
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </header>

      <main className="workspace-main">
        <section className="workspace-intro">
          <span className="eyebrow">CALCULATOR</span>

          <h1>
            Your calculation
            <br />
            <span>workspace.</span>
          </h1>

          <p>
            A clean, focused space for everyday calculations,
            conversions, and more.
          </p>
        </section>

        <div className="workspace-tools">
          <BasicCalculator />

          <UnitConverter />
        </div>
      </main>

      {historyOpen && (
        <div
          className="history-overlay"
          onClick={() => setHistoryOpen(false)}
        >
          <aside
            className="history-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="history-drawer-header">
              <h2>Calculation history</h2>

              <button
                type="button"
                className="icon-button"
                title="Close history"
                aria-label="Close history"
                onClick={() => setHistoryOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <HistoryPanel
              history={history}
              onSelect={() => setHistoryOpen(false)}
              onRemove={removeCalculation}
              onClear={clearHistory}
            />
          </aside>
        </div>
      )}
    </div>
  );
}