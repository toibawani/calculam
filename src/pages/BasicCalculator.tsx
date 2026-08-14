import { useEffect, useState } from "react";
import {
  Delete,
  Divide,
  Minus,
  Percent,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";

type Operator = "+" | "-" | "*" | "/";

type BasicCalculatorProps = {
  onCalculation?: (expression: string, result: string) => void;
};

function calculate(
  first: number,
  operator: Operator,
  second: number,
): number {
  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      return second === 0 ? NaN : first / second;
  }
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return "Error";
  }

  return String(Number(value.toFixed(12)));
}

export default function BasicCalculator({
  onCalculation,
}: BasicCalculatorProps) {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [expression, setExpression] = useState("");

  const inputNumber = (number: string) => {
    if (display === "Error") {
      setDisplay(number);
      setExpression("");
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay(number);
      setWaitingForOperand(false);
      return;
    }

    setDisplay((current) =>
      current === "0" ? number : `${current}${number}`,
    );
  };

  const inputDecimal = () => {
    if (display === "Error") {
      setDisplay("0.");
      setExpression("");
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay((current) => `${current}.`);
    }
  };

  const clearCalculator = () => {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setExpression("");
  };

  const deleteLast = () => {
    if (display === "Error" || waitingForOperand) {
      return;
    }

    setDisplay((current) => {
      if (current.length <= 1) {
        return "0";
      }

      const next = current.slice(0, -1);

      return next === "-" || next === "" ? "0" : next;
    });
  };

  const toggleSign = () => {
    if (display === "Error" || display === "0") {
      return;
    }

    setDisplay((current) =>
      current.startsWith("-")
        ? current.slice(1)
        : `-${current}`,
    );
  };

  const percentage = () => {
    if (display === "Error") {
      return;
    }

    const value = Number(display);

    if (!Number.isFinite(value)) {
      return;
    }

    setDisplay(formatNumber(value / 100));
  };

  const chooseOperator = (nextOperator: Operator) => {
    if (display === "Error") {
      return;
    }

    const inputValue = Number(display);

    if (!Number.isFinite(inputValue)) {
      return;
    }

    if (storedValue !== null && operator !== null) {
      const result = calculate(
        storedValue,
        operator,
        inputValue,
      );

      if (!Number.isFinite(result)) {
        setDisplay("Error");
        setStoredValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }

      setStoredValue(result);
      setDisplay(formatNumber(result));
    } else {
      setStoredValue(inputValue);
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
    setExpression("");
  };

  const equals = () => {
    if (
      storedValue === null ||
      operator === null ||
      display === "Error"
    ) {
      return;
    }

    const inputValue = Number(display);

    if (!Number.isFinite(inputValue)) {
      return;
    }

    const result = calculate(
      storedValue,
      operator,
      inputValue,
    );

    const symbol =
      operator === "*"
        ? "×"
        : operator === "/"
          ? "÷"
          : operator;

    const calculationExpression =
      `${storedValue} ${symbol} ${inputValue} =`;

    const calculationResult = formatNumber(result);

    setExpression(calculationExpression);
    setDisplay(calculationResult);
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(true);

    if (Number.isFinite(result)) {
      onCalculation?.(
        calculationExpression,
        calculationResult,
      );
    }
  };

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (/^[0-9]$/.test(event.key)) {
        event.preventDefault();
        inputNumber(event.key);
        return;
      }

      if (event.key === ".") {
        event.preventDefault();
        inputDecimal();
        return;
      }

      if (
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/"
      ) {
        event.preventDefault();
        chooseOperator(event.key as Operator);
        return;
      }

      if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        equals();
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        clearCalculator();
        return;
      }

      if (event.key === "Backspace") {
        event.preventDefault();
        deleteLast();
        return;
      }

      if (event.key === "%") {
        event.preventDefault();
        percentage();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard,
      );
    };
  });

  const buttonClass = "calculator-button";

  return (
    <section className="calculator-card">
      <div className="calculator-display">
        <div className="calculator-expression">
          {expression}
        </div>

        <div className="calculator-value">
          {display}
        </div>
      </div>

      <div className="calculator-grid">
        <button
          type="button"
          className={`${buttonClass} secondary`}
          onClick={clearCalculator}
          aria-label="Clear"
        >
          <RotateCcw size={18} />
        </button>

        <button
          type="button"
          className={`${buttonClass} secondary`}
          onClick={deleteLast}
          aria-label="Delete"
        >
          <Delete size={18} />
        </button>

        <button
          type="button"
          className={`${buttonClass} secondary`}
          onClick={percentage}
          aria-label="Percentage"
        >
          <Percent size={18} />
        </button>

        <button
          type="button"
          className={`${buttonClass} operator`}
          onClick={() => chooseOperator("/")}
          aria-label="Divide"
        >
          <Divide size={18} />
        </button>

        {["7", "8", "9"].map((number) => (
          <button
            key={number}
            type="button"
            className={buttonClass}
            onClick={() => inputNumber(number)}
          >
            {number}
          </button>
        ))}

        <button
          type="button"
          className={`${buttonClass} operator`}
          onClick={() => chooseOperator("*")}
          aria-label="Multiply"
        >
          <X size={18} />
        </button>

        {["4", "5", "6"].map((number) => (
          <button
            key={number}
            type="button"
            className={buttonClass}
            onClick={() => inputNumber(number)}
          >
            {number}
          </button>
        ))}

        <button
          type="button"
          className={`${buttonClass} operator`}
          onClick={() => chooseOperator("-")}
          aria-label="Subtract"
        >
          <Minus size={18} />
        </button>

        {["1", "2", "3"].map((number) => (
          <button
            key={number}
            type="button"
            className={buttonClass}
            onClick={() => inputNumber(number)}
          >
            {number}
          </button>
        ))}

        <button
          type="button"
          className={`${buttonClass} operator`}
          onClick={() => chooseOperator("+")}
          aria-label="Add"
        >
          <Plus size={18} />
        </button>

        <button
          type="button"
          className={`${buttonClass} secondary`}
          onClick={toggleSign}
        >
          +/−
        </button>

        <button
          type="button"
          className={buttonClass}
          onClick={() => inputNumber("0")}
        >
          0
        </button>

        <button
          type="button"
          className={buttonClass}
          onClick={inputDecimal}
        >
          .
        </button>

        <button
          type="button"
          className={`${buttonClass} equals`}
          onClick={equals}
        >
          =
        </button>
      </div>
    </section>
  );
}