import { useEffect, useState } from "react";

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

function formatResult(value: number): string {
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
  const [operator, setOperator] =
    useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] =
    useState(false);
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
      current === "0" ? number : current + number,
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

  const clear = () => {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setExpression("");
  };

  const toggleSign = () => {
    if (display === "0" || display === "Error") {
      return;
    }

    setDisplay((current) =>
      current.startsWith("-")
        ? current.slice(1)
        : `-${current}`,
    );
  };

  const percentage = () => {
    const value = Number(display);

    if (!Number.isFinite(value)) {
      return;
    }

    setDisplay(String(value / 100));
  };

  const chooseOperator = (nextOperator: Operator) => {
    if (display === "Error") {
      return;
    }

    const inputValue = Number(display);

    if (!Number.isFinite(inputValue)) {
      return;
    }

    if (
      storedValue !== null &&
      operator !== null &&
      !waitingForOperand
    ) {
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
      setDisplay(formatResult(result));
    } else {
      setStoredValue(inputValue);
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
    setExpression(
      `${inputValue.toLocaleString("en-IN")} ${nextOperator}`,
    );
  };

  const equals = () => {
    if (storedValue === null || operator === null) {
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
      `${storedValue.toLocaleString("en-IN")} ${symbol} ${inputValue.toLocaleString("en-IN")} =`;

    const calculationResult = formatResult(result);

    setExpression(calculationExpression);
    setDisplay(calculationResult);

    if (Number.isFinite(result)) {
      onCalculation?.(
        calculationExpression,
        calculationResult,
      );
    }

    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const handleKeyboard = (event: KeyboardEvent) => {
    if (/^[0-9]$/.test(event.key)) {
      inputNumber(event.key);
      return;
    }

    if (event.key === ".") {
      inputDecimal();
      return;
    }

    if (
      event.key === "+" ||
      event.key === "-" ||
      event.key === "*" ||
      event.key === "/"
    ) {
      chooseOperator(event.key as Operator);
      return;
    }

    if (event.key === "Enter" || event.key === "=") {
      equals();
      return;
    }

    if (event.key === "Escape") {
      clear();
      return;
    }

    if (event.key === "%") {
      percentage();
      return;
    }

    if (event.key === "Backspace") {
      setDisplay((current) => {
        if (current === "Error") {
          return "0";
        }

        if (current.length <= 1) {
          return "0";
        }

        return current.slice(0, -1);
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard,
      );
    };
  });

  return (
    <section className="calculator-card">
      <div className="calculator-header">
        <div>
          <span className="eyebrow">CALCULATOR</span>

          <h2>Basic Calculator</h2>
        </div>

        <button
          type="button"
          className="calculator-clear"
          onClick={clear}
        >
          Clear
        </button>
      </div>

      <div className="calculator-display">
        <div className="calculator-expression">
          {expression}
        </div>

        <div className="calculator-value">
          {display}
        </div>
      </div>

      <div className="calculator-keypad">
        <button
          type="button"
          className="calculator-key utility"
          onClick={clear}
        >
          AC
        </button>

        <button
          type="button"
          className="calculator-key utility"
          onClick={toggleSign}
        >
          ±
        </button>

        <button
          type="button"
          className="calculator-key utility"
          onClick={percentage}
        >
          %
        </button>

        <button
          type="button"
          className="calculator-key operator"
          onClick={() => chooseOperator("/")}
        >
          ÷
        </button>

        {["7", "8", "9"].map((number) => (
          <button
            key={number}
            type="button"
            className="calculator-key"
            onClick={() => inputNumber(number)}
          >
            {number}
          </button>
        ))}

        <button
          type="button"
          className="calculator-key operator"
          onClick={() => chooseOperator("*")}
        >
          ×
        </button>

        {["4", "5", "6"].map((number) => (
          <button
            key={number}
            type="button"
            className="calculator-key"
            onClick={() => inputNumber(number)}
          >
            {number}
          </button>
        ))}

        <button
          type="button"
          className="calculator-key operator"
          onClick={() => chooseOperator("-")}
        >
          −
        </button>

        {["1", "2", "3"].map((number) => (
          <button
            key={number}
            type="button"
            className="calculator-key"
            onClick={() => inputNumber(number)}
          >
            {number}
          </button>
        ))}

        <button
          type="button"
          className="calculator-key operator"
          onClick={() => chooseOperator("+")}
        >
          +
        </button>

        <button
          type="button"
          className="calculator-key zero"
          onClick={() => inputNumber("0")}
        >
          0
        </button>

        <button
          type="button"
          className="calculator-key"
          onClick={inputDecimal}
        >
          .
        </button>

        <button
          type="button"
          className="calculator-key equals"
          onClick={equals}
        >
          =
        </button>
      </div>
    </section>
  );
}