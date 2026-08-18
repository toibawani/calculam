import { useMemo, useState } from "react";

type CommandCenterProps = {
  onCalculation?: (expression: string, result: string) => void;
};

function evaluateCommand(input: string): number {
  const command = input
    .trim()
    .toLowerCase()
    .replace(/,/g, "");

  if (!command) {
    return NaN;
  }

  // Percentage of a value
  const percentageMatch = command.match(
    /^(-?\d+(?:\.\d+)?)%\s+of\s+(-?\d+(?:\.\d+)?)$/,
  );

  if (percentageMatch) {
    const percentage = Number(percentageMatch[1]);
    const value = Number(percentageMatch[2]);

    return (percentage / 100) * value;
  }

  // Percentage increase
  const increaseMatch = command.match(
    /^increase\s+(-?\d+(?:\.\d+)?)\s+by\s+(-?\d+(?:\.\d+)?)%$/,
  );

  if (increaseMatch) {
    const value = Number(increaseMatch[1]);
    const percentage = Number(increaseMatch[2]);

    return value * (1 + percentage / 100);
  }

  // Percentage decrease
  const decreaseMatch = command.match(
    /^decrease\s+(-?\d+(?:\.\d+)?)\s+by\s+(-?\d+(?:\.\d+)?)%$/,
  );

  if (decreaseMatch) {
    const value = Number(decreaseMatch[1]);
    const percentage = Number(decreaseMatch[2]);

    return value * (1 - percentage / 100);
  }

  // Square root
  const sqrtMatch = command.match(
    /^(?:sqrt|square\s+root\s+of)\s+(-?\d+(?:\.\d+)?)$/,
  );

  if (sqrtMatch) {
    return Math.sqrt(Number(sqrtMatch[1]));
  }

  // Square
  const squareMatch = command.match(
    /^(-?\d+(?:\.\d+)?)\s+squared$/,
  );

  if (squareMatch) {
    const value = Number(squareMatch[1]);

    return value ** 2;
  }

  // Power
  const powerMatch = command.match(
    /^(-?\d+(?:\.\d+)?)\s*(?:\^|to\s+the\s+power\s+of)\s*(-?\d+(?:\.\d+)?)$/,
  );

  if (powerMatch) {
    const base = Number(powerMatch[1]);
    const exponent = Number(powerMatch[2]);

    return base ** exponent;
  }

  // Arithmetic
  const arithmeticMatch = command.match(
    /^(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)$/,
  );

  if (arithmeticMatch) {
    const first = Number(arithmeticMatch[1]);
    const operator = arithmeticMatch[2];
    const second = Number(arithmeticMatch[3]);

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

  const formattedResult = formatResult(result);

  const handleCalculate = () => {
    const expression = command.trim();

    if (!expression || !Number.isFinite(result)) {
      return;
    }

    onCalculation?.(
      expression,
      String(Number(result.toFixed(12))),
    );
  };

  const examples = [
    "15% of 840",
    "sqrt 144",
    "25 * 18",
    "12 squared",
    "2 ^ 8",
    "increase 500 by 20%",
  ];

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
          aria-label="Natural language calculation"
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
          disabled={!Number.isFinite(result)}
        >
          Calculate
        </button>
      </div>

      <div className="command-examples">
        {examples.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setCommand(example)}
          >
            {example}
          </button>
        ))}
      </div>
    </section>
  );
}