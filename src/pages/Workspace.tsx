import { Calculator, Clock3, Command, History, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import BasicCalculator from "../features/calculator/BasicCalculator";

export default function Workspace() {
  return (
    <div className="workspace-page">
      <header className="workspace-header">
        <div className="workspace-brand">
          <Link to="/" className="workspace-logo">
            <span className="workspace-logo-mark">
              <Sparkles size={17} />
            </span>
            Calculam
          </Link>

          <span className="workspace-divider" />

          <span className="workspace-label">Workspace</span>
        </div>

        <div className="workspace-actions">
          <button className="workspace-action" type="button">
            <History size={17} />
            <span>History</span>
          </button>

          <button className="workspace-action" type="button">
            <Command size={17} />
            <span>Command</span>
          </button>
        </div>
      </header>

      <main className="workspace-main">
        <section className="workspace-intro">
          <div>
            <div className="workspace-eyebrow">
              <Calculator size={15} />
              Calculation workspace
            </div>

            <h1>Calculate without the clutter.</h1>

            <p>
              A focused space for everyday calculations, conversions and
              everything in between.
            </p>
          </div>

          <div className="workspace-status">
            <span className="status-dot" />
            Ready
            <span className="status-time">
              <Clock3 size={14} />
              Live
            </span>
          </div>
        </section>

        <section className="calculator-layout">
          <div className="calculator-main-card">
            <BasicCalculator />
          </div>

          <aside className="workspace-side-panel">
            <div className="side-panel-heading">
              <div>
                <span className="side-panel-kicker">Quick access</span>
                <h2>Your tools</h2>
              </div>

              <Sparkles size={18} />
            </div>

            <button className="tool-card" type="button">
              <span className="tool-icon">+</span>
              <span>
                <strong>New calculation</strong>
                <small>Start from a clean slate</small>
              </span>
            </button>

            <button className="tool-card" type="button">
              <span className="tool-icon">↔</span>
              <span>
                <strong>Unit converter</strong>
                <small>Length, weight, temperature & more</small>
              </span>
            </button>

            <button className="tool-card" type="button">
              <span className="tool-icon">⌁</span>
              <span>
                <strong>Calculation history</strong>
                <small>Your recent results</small>
              </span>
            </button>

            <div className="keyboard-hint">
              <span>Tip</span>
              <p>
                You can use your keyboard to enter numbers and operators
                directly.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
