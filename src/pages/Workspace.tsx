import {
  ArrowLeft,
  Calculator,
  History,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";

import BasicCalculator from "../features/calculator/BasicCalculator";
import HistoryPanel from "../features/history/HistoryPanel";
import { useCalculationHistory } from "../features/history/useCalculationHistory";

export default function Workspace() {
  const {
    history,
    addCalculation,
    removeCalculation,
    clearHistory,
  } = useCalculationHistory();

  const handleCalculation = (
    expression: string,
    result: string,
  ) => {
    addCalculation(expression, result);
  };

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
            onClick={() => {
              const panel = document.getElementById(
                "calculation-history",
              );

              panel?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
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

        <BasicCalculator
          onCalculation={handleCalculation}
        />

        <section
          id="calculation-history"
          style={{
            marginTop: "32px",
          }}
        >
          <HistoryPanel
            history={history}
            onSelect={(expression) => {
              console.log("Selected calculation:", expression);
            }}
            onRemove={removeCalculation}
            onClear={clearHistory}
          />
        </section>
      </main>
    </div>
  );
}
