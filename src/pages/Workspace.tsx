import { useState } from "react";
import { Calculator, History } from "lucide-react";
import BasicCalculator from "../features/calculator/BasicCalculator";
import UnitConverter from "../features/converter/UnitConverter";
import CommandCenter from "../features/command/CommandCenter";
import HistoryPanel from "../features/history/HistoryPanel";
import { useCalculationHistory } from "../features/history/useCalculationHistory";
import ThemeToggle from "../features/theme/ThemeToggle";

export default function Workspace() {
  const [showHistory, setShowHistory] = useState(false);
  const {
    history,
    addCalculation,
    removeCalculation,
    clearHistory,
  } = useCalculationHistory();

  const handleCalculation = (expression: string, result: string) => {
    addCalculation(expression, result);
  };

  const handleReuseCalculation = (expression: string) => {
    // For now, just log - future enhancement could parse and reuse
    console.log("Reuse:", expression);
  };

  return (
    <div className="workspace-page">
      <header className="workspace-header">
        <div className="workspace-brand">
          <div className="brand-icon">
            <Calculator size={19} strokeWidth={2.2} />
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
            onClick={() => setShowHistory(!showHistory)}
            aria-label="Toggle history"
            title="Toggle history"
          >
            <History size={18} />
          </button>

          <ThemeToggle />
        </div>
      </header>

      <main className="workspace-main">
        <div className="workspace-intro">
          <span className="eyebrow">CALCULATE</span>

          <h1>
            Your calculation
            <br />
            <span>workspace.</span>
          </h1>

          <p>
            A focused space for calculations, conversions, and natural-language commands.
          </p>
        </div>

        <div className="workspace-tools">
          <div className="tool-primary">
            <BasicCalculator onCalculation={handleCalculation} />
          </div>

          <div className="tool-secondary">
            <UnitConverter />
            <CommandCenter onCalculation={handleCalculation} />
          </div>
        </div>
      </main>

      {showHistory && (
        <div className="history-drawer">
          <HistoryPanel
            history={history}
            onSelect={handleReuseCalculation}
            onRemove={removeCalculation}
            onClear={clearHistory}
          />
        </div>
      )}
    </div>
  );
}
