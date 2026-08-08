import { useEffect, useState } from "react";

import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorKeypad from "./CalculatorKeypad";

import {
  calculate,
  formatResult,
} from "./calculatorEngine";

import HistoryPanel from "../history/HistoryPanel";
import { useCalculationHistory } from "../history/useCalculationHistory";

function BasicCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const {
    history,
    addCalculation,
    removeCalculation,
    clearHistory,
  } = useCalculationHistory();

  const calculateExpression = () => {
    if (!expression.trim()) {
      return;
    }

    const calculation = calculate(expression);

    if (calculation.error) {
      setResult(calculation.error);
      return;
    }

    if (calculation.value === null) {
      setResult("");
      return;
    }

    const formatted = formatResult(calculation.value);

    setResult(formatted);

    addCalculation(
      expression,
      formatted,
    );
  };

  const clear = () => {
    setExpression("");
    setResult("");
  };

  const removeLast = () => {
    setExpression((current) =>
      current.slice(0, -1),
    );

    setResult("");
  };

  const addInput = (value: string) => {
    setExpression((current) =>
      `${current}${value}`,
    );

    setResult("");
  };

  const selectHistoryItem = (
    previousExpression: string,
  ) => {
    setExpression(previousExpression);
    setResult("");
  };

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (/^[0-9.]$/.test(event.key)) {
        addInput(event.key);
        return;
      }

      if (
        ["+", "-", "*", "/", "(", ")"].includes(
          event.key,
        )
      ) {
        addInput(event.key);
        return;
      }

      if (
        event.key === "Enter" ||
        event.key === "="
      ) {
        calculateExpression();
        return;
      }

      if (event.key === "Backspace") {
        removeLast();
        return;
      }

      if (event.key === "Escape") {
        clear();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyboard,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard,
      );
    };
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "minmax(320px, 440px) minmax(280px, 440px)",
        gap: "20px",
        alignItems: "start",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          padding: "18px",
          border: "1px solid #E2E8F0",
          borderRadius: "28px",
          background: "#FFFFFF",
          boxShadow:
            "0 20px 60px rgba(15, 23, 42, 0.08)",
        }}
      >
        <CalculatorDisplay
          expression={expression}
          result={result}
        />

        <CalculatorKeypad
          onInput={addInput}
          onClear={clear}
          onDelete={removeLast}
          onCalculate={calculateExpression}
        />

        <p
          style={{
            margin: "16px 0 2px",
            textAlign: "center",
            color: "#94A3B8",
            fontSize: "0.75rem",
          }}
        >
          Keyboard supported · Enter to calculate ·
          Esc to clear
        </p>
      </div>

      <HistoryPanel
        history={history}
        onSelect={selectHistoryItem}
        onRemove={removeCalculation}
        onClear={clearHistory}
      />
    </div>
  );
}

export default BasicCalculator;