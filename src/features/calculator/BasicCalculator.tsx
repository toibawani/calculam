import { useEffect, useState, type ReactNode } from "react";
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

export default function BasicCalculator() {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState<number | null>(
    null,
  );
  const [operator, setOperator] =
    useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] =
    useState(false);
  const [expression, setExpression] = useState("");

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

    setExpression(
      `${storedValue.toLocaleString("en-IN")} ${symbol} ${inputValue.toLocaleString("en-IN")} =`,
    );

    setDisplay(
      Number.isFinite(result)
        ? String(Number(result.toFixed(12)))
        : "Error",
    );

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

  const operatorButton = (
    value: Operator,
    icon: ReactNode,
  ) => (
    <button
      type="button"
      className="calc-key calc-operator"
      onClick={() => chooseOperator(value)}
      aria-label={`operator ${value}`}
    >
      {icon}
    </button>
  );

  return (
    <section className="basic-calculator">
      <div className="calculator-header">
        <div>
          <span className="calculator-eyebrow">
            BASIC
          </span>

          <h2>Calculator</h2>
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
          {expression || "Ready to calculate"}
        </div>

        <div
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
          className="calc-key calc-function"
          onClick={clear}
        >
          AC
        </button>

        <button
          type="button"
          className="calc-key calc-function"
          onClick={toggleSign}
        >
          ±
        </button>

        <button
          type="button"
          className="calc-key calc-function"
          onClick={percentage}
        >
          %
        </button>

        <button
          type="button"
          className="calc-key calc-operator"
          onClick={() => chooseOperator("/")}
        >
          <Divide size={21} strokeWidth={2.3} />
        </button>

        {numberButton("7")}
        {numberButton("8")}
        {numberButton("9")}

        {operatorButton(
          "*",
          <X size={21} strokeWidth={2.3} />,
        )}

        {numberButton("4")}
        {numberButton("5")}
        {numberButton("6")}

        {operatorButton(
          "-",
          <Minus size={21} strokeWidth={2.3} />,
        )}

        {numberButton("1")}
        {numberButton("2")}
        {numberButton("3")}

        {operatorButton(
          "+",
          <Plus size={21} strokeWidth={2.3} />,
        )}

        <button
          type="button"
          className="calc-key calc-number"
          onClick={() => inputNumber("0")}
        >
          0
        </button>

        <button
          type="button"
          className="calc-key calc-number"
          onClick={inputDecimal}
        >
          .
        </button>

        <button
          type="button"
          className="calc-key calc-function"
          onClick={backspace}
          aria-label="Backspace"
        >
          <Delete size={20} />
        </button>

        <button
          type="button"
          className="calc-key calc-equals"
          onClick={equals}
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
