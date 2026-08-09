import {
  ArrowLeft,
  Calculator,
  Delete,
  History,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const buttons = [
  ["C", "⌫", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "=", "↵"],
];

export default function Workspace() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");

  const handlePress = (value: string) => {
    if (value === "C") {
      setDisplay("0");
      setExpression("");
      return;
    }

    if (value === "⌫") {
      setDisplay((current) =>
        current.length > 1 ? current.slice(0, -1) : "0",
      );
      return;
    }

    if (value === "=") {
      try {
        const safeExpression = expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-");

        // Basic arithmetic evaluation for the initial workspace.
        const result = Function(
          `"use strict"; return (${safeExpression || display})`,
        )();

        setDisplay(String(result));
        setExpression(String(result));
      } catch {
        setDisplay("Error");
      }

      return;
    }

    if (["+", "−", "×", "÷", "%"].includes(value)) {
      setExpression((current) =>
        `${current || display}${value}`,
      );
      setDisplay("0");
      return;
    }

    if (value === ".") {
      if (!display.includes(".")) {
        setDisplay((current) => `${current}.`);
      }
      return;
    }

    setDisplay((current) =>
      current === "0" ? value : `${current}${value}`,
    );
  };

  return (
    <div className="workspace-page">
      <header className="workspace-header">
        <div className="workspace-brand">
          <Link to="/" className="back-button">
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
          <button className="icon-button" title="History">
            <History size={19} />
          </button>

          <button
            className="icon-button"
            title="Reset"
            onClick={() => {
              setDisplay("0");
              setExpression("");
            }}
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

        <section className="calculator-shell">
          <div className="calculator-topbar">
            <div>
              <span className="calculator-label">Basic Calculator</span>
              <span className="calculator-status">Ready</span>
            </div>

            <button
              className="clear-button"
              onClick={() => {
                setDisplay("0");
                setExpression("");
              }}
            >
              Clear
              <Delete size={16} />
            </button>
          </div>

          <div className="calculator-display">
            <span className="expression">
              {expression || "Ready for your calculation"}
            </span>

            <strong>{display}</strong>
          </div>

          <div className="calculator-keypad">
            {buttons.flat().map((button) => (
              <button
                key={button}
                className={[
                  "calculator-key",
                  button === "=" ? "equals" : "",
                  ["÷", "×", "−", "+"].includes(button)
                    ? "operator"
                    : "",
                  ["C", "⌫", "%"].includes(button)
                    ? "utility"
                    : "",
                ].join(" ")}
                onClick={() => handlePress(button)}
              >
                {button}
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}