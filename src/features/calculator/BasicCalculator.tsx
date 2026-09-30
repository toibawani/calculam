import { useEffect, useRef, useState } from "react";
import {
  Delete,
  Divide,
  Equal,
  Minus,
  Plus,
  X,
} from "lucide-react";

type Operator = "+" | "-" | "*" | "/";

function calculate(
  a: number,
  operator: Operator,
  b: number,
): number {
  switch (operator) {
    case "+":
      return a + b;

    case "-":
      return a - b;

    case "*":
      return a * b;

    case "/":
      return b === 0 ? NaN : a / b;
  }
}

type BasicCalculatorProps = {
  onCalculation?: (expression: string, result: string) => void;
};

export default function BasicCalculator({
  onCalculation,
}: BasicCalculatorProps) {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState<number | null>(
    null,
  );
  const [operator, setOperator] =
    useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] =
    useState(false);
  const [expression, setExpression] = useState("");
  const displayRef = useRef<HTMLDivElement>(null);

  const inputNumber = (number: string) => {
    if (display === "Error") {
      setDisplay(number);
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
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(`${display}.`);
    }
  };

  const clear = () => {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setExpression("");
  };

  const backspace = () => {
    if (waitingForOperand || display === "Error") {
      return;
    }

    setDisplay((current) => {
      if (current.length <= 1 || current === "-0") {
        return "0";
      }

      return current.slice(0, -1);
    });
  };

  const chooseOperator = (nextOperator: Operator) => {
    const inputValue = Number(display);

    if (!Number.isFinite(inputValue)) {
      return;
    }

    if (storedValue === null) {
      setStoredValue(inputValue);
    } else if (operator) {
      const result = calculate(
        storedValue,
        operator,
        inputValue,
      );

      setStoredValue(result);

      setDisplay(
        Number.isFinite(result)
          ? String(Number(result.toFixed(12)))
          : "Error",
      );
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);

    const symbols: Record<Operator, string> = {
      "+": "+",
      "-": "−",
      "*": "×",
      "/": "÷",
    };

    setExpression(
      `${inputValue.toLocaleString("en-IN")} ${symbols[nextOperator]}`,
    );
  };

  const equals = () => {
    if (storedValue === null || operator === null) {
      return;
    }

    const inputValue = Number(display);

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

    const calculationResult = Number.isFinite(result)
      ? String(Number(result.toFixed(12)))
      : "Error";

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

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (/^[0-9]$/.test(event.key)) {
        inputNumber(event.key);
      }

      if (event.key === ".") {
        inputDecimal();
      }

      if (event.key === "+") {
        chooseOperator("+");
      }

      if (event.key === "-") {
        chooseOperator("-");
      }

      if (event.key === "*") {
        chooseOperator("*");
      }

      if (event.key === "/") {
        event.preventDefault();
        chooseOperator("/");
      }

      if (event.key === "Enter" || event.key === "=") {
        equals();
      }

      if (event.key === "Escape") {
        clear();
      }

      if (event.key === "Backspace") {
        backspace();
      }

      if (event.key === "%") {
        percentage();
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

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.classList.remove("animate");
      void displayRef.current.offsetWidth; // Trigger reflow
      displayRef.current.classList.add("animate");
    }
  }, [display]);

  const numberButton = (
    value: string,
    className = "",
  ) => (
    <button
      type="button"
      className={`calc-key calc-number ${className}`}
      onClick={() => inputNumber(value)}
    >
      {value}
    </button>
  );

  return (
    <section className="calculator-card">
      <div className="calculator-header">
        <div>
          <span className="eyebrow">BASIC</span>

          <h2>Calculator</h2>
        </div>

        <button
          type="button"
          className="calculator-clear"
          onClick={clear}
          aria-label="Clear calculator"
        >
          Clear
        </button>
      </div>

      <div className="calculator-display">
        <div className="calculator-expression">
          {expression || "Ready to calculate"}
        </div>

        <div
          ref={displayRef}
          className={`calculator-value ${
            display.length > 12
              ? "calculator-value-small"
              : ""
          }`}
        >
          {display}
        </div>
      </div>

      <div className="calculator-keypad">
        <button
          type="button"
          className="calculator-key utility"
          onClick={clear}
          aria-label="All clear"
        >
          AC
        </button>

        <button
          type="button"
          className="calculator-key utility"
          onClick={toggleSign}
          aria-label="Toggle sign"
        >
          ±
        </button>

        <button
          type="button"
          className="calculator-key utility"
          onClick={percentage}
          aria-label="Percentage"
        >
          %
        </button>

        <button
          type="button"
          className="calculator-key operator"
          onClick={() => chooseOperator("/")}
          aria-label="Divide"
        >
          <Divide size={21} strokeWidth={2.3} />
        </button>

        {numberButton("7")}
        {numberButton("8")}
        {numberButton("9")}

        <button
          type="button"
          className="calculator-key operator"
          onClick={() => chooseOperator("*")}
          aria-label="Multiply"
        >
          <X size={21} strokeWidth={2.3} />
        </button>

        {numberButton("4")}
        {numberButton("5")}
        {numberButton("6")}

        <button
          type="button"
          className="calculator-key operator"
          onClick={() => chooseOperator("-")}
          aria-label="Subtract"
        >
          <Minus size={21} strokeWidth={2.3} />
        </button>

        {numberButton("1")}
        {numberButton("2")}
        {numberButton("3")}

        <button
          type="button"
          className="calculator-key operator"
          onClick={() => chooseOperator("+")}
          aria-label="Add"
        >
          <Plus size={21} strokeWidth={2.3} />
        </button>

        <button
          type="button"
          className="calculator-key"
          onClick={() => inputNumber("0")}
          aria-label="0"
        >
          0
        </button>

        <button
          type="button"
          className="calculator-key"
          onClick={inputDecimal}
          aria-label="Decimal point"
        >
          .
        </button>

        <button
          type="button"
          className="calculator-key utility"
          onClick={backspace}
          aria-label="Backspace"
        >
          <Delete size={20} />
        </button>

        <button
          type="button"
          className="calculator-key equals"
          onClick={equals}
          aria-label="Equals"
        >
          <Equal
            size={22}
            strokeWidth={2.5}
          />
        </button>
      </div>

      <div className="calculator-shortcut">
        <span>⌘</span>
        <span>Keyboard ready</span>
      </div>
    </section>
  );
}
