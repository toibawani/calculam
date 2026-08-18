import { useMemo, useState } from "react";

type CommandCenterProps = {
  onCalculation?: (expression: string, result: string) => void;
};

type ArithmeticOperator = "+" | "-" | "*" | "/";

function parseNumber(value: string): number {
  return Number(value.replace(/,/g, ""));
}

function evaluateCommand(input: string): number {
  const command = input.trim().toLowerCase();

  if (!command) {
    return NaN;
  }

  // Percentage:
  // "15% of 840"
  const percentageMatch = command.match(
    /^(-?\d+(?:\.\d+)?)\s*%\s*of\s*(-?\d+(?:\.\d+)?)$/,
  );

  if (percentageMatch) {
    const percentage = parseNumber(percentageMatch[1]);
    const value = parseNumber(percentageMatch[2]);

    return (percentage / 100) * value;
  }

  // Square root:
  // "sqrt 144"
  // "sqrt 2"
  // "square root of 144"
  const sqrtMatch = command.match(
    /^(?:sqrt|square\s+root(?:\s+of)?)\s+(-?\d+(?:\.\d+)?)$/,
  );

  if (sqrtMatch) {
    const value = parseNumber(sqrtMatch[1]);

    if (value < 0) {
      return NaN;
    }

    return Math.sqrt(value);
  }

  // Basic arithmetic:
  // "25 + 18"
  // "100 - 45"
  // "12 * 8"
  // "144 / 12"
  const arithmeticMatch = command.match(
    /^(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)$/,
  );

  if (arithmeticMatch) {
    const first = parseNumber(arithmeticMatch[1]);
    const operator = arithmeticMatch[2] as ArithmeticOperator;
    const second = parseNumber(arithmeticMatch[3]);

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

  return NaN;
}

function formatResult(value: number): string {
  if (!Number.isFinite(value)) {
    return "No result";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 10,
  }).format(value);
}

export default function CommandCenter({
  onCalculation,
}: CommandCenterProps) {
  const [command, setCommand] = useState("");

  const result = useMemo(
    () => evaluateCommand(command),
    [command],
  );

  const isValid = Number.isFinite(result);

  const formattedResult = formatResult(result);

  const handleCalculate = () => {
    const expression = command.trim();

    if (!expression || !isValid) {
      return;
    }

    onCalculation?.(
      expression,
      String(Number(result.toFixed(12))),
    );
  };

  const handleExample = (example: string) => {
    setCommand(example);
  };

  return (
    <section className="command-card">
      <div className="command-header">
        <div>
          <span className="converter-eyebrow">
            COMMAND CENTER
          </span>

          <h2>Calculate naturally</h2>
        </div>

        <span className="converter-result-label">
          {formattedResult}
        </span>
      </div>

      <div className="command-input-row">
        <input
          type="text"
          value={command}
          placeholder="Try 15% of 840"
          aria-label="Calculation command"
          onChange={(event) =>
            setCommand(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleCalculate();
            }
          }}
        />

        <button
          type="button"
          onClick={handleCalculate}
          disabled={!isValid}
        >
          Calculate
        </button>
      </div>

      <div className="command-examples">
        <button
          type="button"
          onClick={() => handleExample("15% of 840")}
        >
          15% of 840
        </button>

        <button
          type="button"
          onClick={() => handleExample("sqrt 144")}
        >
          sqrt 144
        </button>

        <button
          type="button"
          onClick={() => handleExample("25 * 18")}
        >
          25 × 18
        </button>

        <button
          type="button"
          onClick={() =>
            handleExample("square root of 256")
          }
        >
          √256
        </button>
      </div>
    </section>
  );
}