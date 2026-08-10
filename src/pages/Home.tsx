import {
  ArrowRight,
  Calculator,
  Command,
  History,
  Sparkles,
  ArrowDownUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Calculator,
    title: "Calculate",
    description:
      "Handle everyday calculations quickly with a focused, keyboard-friendly calculator.",
  },
  {
    icon: ArrowDownUp,
    title: "Convert",
    description:
      "Move between useful units without leaving your calculation workspace.",
  },
  {
    icon: History,
    title: "Remember",
    description:
      "Keep track of recent calculations so useful results are never lost.",
  },
];

export default function Home() {
  return (
    <div className="home-page">
      <nav className="home-nav">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <Calculator size={19} strokeWidth={2.4} />
          </span>

          <span className="brand-name">Calculam</span>
        </Link>

        <div className="nav-actions">
          <Link to="/workspace" className="nav-link">
            Workspace
          </Link>

          <Link to="/workspace" className="nav-cta">
            Open Calculam
            <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <div className="hero-badge">
              <Sparkles size={14} />
              <span>Built for everyday calculations</span>
            </div>

            <h1>
              Math should feel
              <br />
              <span>effortless.</span>
            </h1>

            <p className="hero-description">
              Calculam brings calculations, conversions and useful results
              together in one focused workspace.
            </p>

            <div className="hero-actions">
              <Link to="/workspace" className="primary-action">
                Get Started
                <ArrowRight size={18} />
              </Link>

              <Link to="/workspace" className="secondary-action">
                <Command size={16} />
                Explore Workspace
              </Link>
            </div>
          </div>

          <div className="calculator-preview" aria-hidden="true">
            <div className="preview-glow" />

            <div className="preview-window">
              <div className="preview-header">
                <div className="window-controls">
                  <span />
                  <span />
                  <span />
                </div>

                <span className="preview-label">Calculam</span>

                <span className="preview-ready">
                  <span />
                  Ready
                </span>
              </div>

              <div className="preview-body">
                <div className="preview-sidebar">
                  <div className="mini-logo">
                    <Calculator size={15} />
                  </div>

                  <div className="mini-nav active">
                    <Calculator size={14} />
                    <span>Calculator</span>
                  </div>

                  <div className="mini-nav">
                    <ArrowDownUp size={14} />
                    <span>Converter</span>
                  </div>

                  <div className="mini-nav">
                    <History size={14} />
                    <span>History</span>
                  </div>
                </div>

                <div className="preview-workspace">
                  <div className="preview-workspace-heading">
                    <span>Basic Calculator</span>
                    <small>Ready for input</small>
                  </div>

                  <div className="preview-display">
                    <span className="preview-expression">
                      248 × 4 + 16
                    </span>

                    <strong>1,008</strong>
                  </div>

                  <div className="preview-keypad">
                    {[
                      "AC",
                      "⌫",
                      "%",
                      "÷",
                      "7",
                      "8",
                      "9",
                      "×",
                      "4",
                      "5",
                      "6",
                      "−",
                      "1",
                      "2",
                      "3",
                      "+",
                      "0",
                      ".",
                      "=",
                    ].map((key) => (
                      <span
                        key={key}
                        className={
                          key === "="
                            ? "preview-key equal"
                            : key === "÷" ||
                                key === "×" ||
                                key === "−" ||
                                key === "+"
                              ? "preview-key operator"
                              : "preview-key"
                        }
                      >
                        {key}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="section-heading">
            <span>Everything in one place</span>
            <h2>A workspace that stays out of your way.</h2>
          </div>

          <div className="feature-grid">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article className="feature-card" key={feature.title}>
                  <div className="feature-icon">
                    <Icon size={20} strokeWidth={2} />
                  </div>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
